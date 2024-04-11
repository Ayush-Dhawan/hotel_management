import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
  import yearlyData from './yearlyData';
  import regression from 'regression';
  import { useState } from 'react';
  import styled from "styled-components";
  import DashboardBox from "./DashboardBox";
  import Heading from '../../ui/Heading'
  import Button from '../../ui/Button'
  import {useDarkMode} from '../../context/DarkModeContext'

  const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;
  
  function RevenueChart() {
    const {isDarkMode} = useDarkMode();

    const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  
    const [isPredictions, setIsPredictions] = useState(false);
    // const data = OLDdata;
    const data2 = yearlyData;
    const years = Array.from(new Set(data2.map(data => data.year)));
  
    function getMonthName(monthNumber) {
      const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
      return months[monthNumber - 1];
    }
  
    // Split data into arrays based on year
    const dataByYear = yearlyData.reduce((acc, item) => {
      const year = item.year;
      const monthName = getMonthName(item.month);
      
      if (!acc[year]) {
        acc[year] = [];
      }
      
      acc[year].push({ ...item, month: monthName });
      
      return acc;
    }, {});
  
    // Convert object to array of arrays
    const arraysByYear = Object.entries(dataByYear).map(([year, data]) => data);
  
    const year1data = arraysByYear[0];
    const year2data = arraysByYear[1];
  
    const dataForRegression = year1data.map(({ month, totalSales }, index) => {
      const averageTotalSales = (totalSales + year2data[index].totalSales) / 2;
      return { month, totalSales: averageTotalSales };
    });
  
    const formattedData = formatData(dataForRegression);
  
    // Concatenate data from year1, year2, and regression
    const combinedData = year1data.map((entry, index) => ({
      month: entry.month,
      totalSales1: entry.totalSales,
      totalSales2: year2data[index].totalSales,
      predictedRevenue: formattedData[index]["Predicted Revenue"],
    }));
  
    return (
      <>
  
  
        <StyledSalesChart>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Heading as="h2">Revenue of previous 2 years</Heading>
            <Button size="small" onClick={() => setIsPredictions(!isPredictions)}>{isPredictions ? "Hide Predictions" : "Show Predictions"}</Button>
        </div>
          <ResponsiveContainer height={300} width="100%">
          <LineChart data={combinedData} >
            <CartesianGrid strokeDasharray={4} />
            <XAxis dataKey="month" tick={{fill: colors.text}} tickLine={{stroke: colors.text}} />
            <YAxis dataKey="totalSales2" unit="$" tick={{fill: colors.text, fontSize: 14}} tickLine={{stroke: colors.text}} />
            <Tooltip  contentStyle={{backgroundColor: colors.background}} />
            {/* Line for year 1 data */}
            <Line type="monotone" dataKey="totalSales1" stroke="#c2410c" strokeWidth={3} name='2022' />
            {/* Line for year 2 data */}
            <Line type="monotone" dataKey="totalSales2" stroke={colors.extrasSales.stroke}  strokeWidth={3} name='2023' />
            {/* Render regression line if predictions are enabled */}
            {isPredictions && (
              <Line type="monotone" dataKey="predictedRevenue" stroke={colors.totalSales.stroke} dot={false} strokeWidth={3} name='Predictions for 2024' />
            )}
            <Legend align="right" verticalAlign="top" />
          </LineChart>
          </ResponsiveContainer>
        </StyledSalesChart>
      </>
    )
  }
  
  export default RevenueChart;
  
  const formatData = (year2data) => {
    const formatted = year2data.map(({ month, totalSales }, i) => [i + 12, totalSales]); // Adjust month index for year 2
    const regressionLine = regression.linear(formatted);
  
    return year2data.map(({ month, totalSales }, i) => ({
      month,
      "Actual Sales": totalSales,
      "Regression Line": regressionLine.points[i][1],
      "Predicted Revenue": regressionLine.predict(i + 12)[1]
    }));
  }