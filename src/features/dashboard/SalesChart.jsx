import PropTypes from 'prop-types';
import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import React from 'react'
import Heading from '../../ui/Heading'
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import {useDarkMode} from '../../context/DarkModeContext'
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
    

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const fakeData = [
  { label: "Jan 09", totalSales: 480, extrasSales: 20 },
  { label: "Jan 10", totalSales: 580, extrasSales: 100 },
  { label: "Jan 11", totalSales: 550, extrasSales: 150 },
  { label: "Jan 12", totalSales: 600, extrasSales: 50 },
  { label: "Jan 13", totalSales: 700, extrasSales: 150 },
  { label: "Jan 14", totalSales: 800, extrasSales: 150 },
  { label: "Jan 15", totalSales: 700, extrasSales: 200 },
  { label: "Jan 16", totalSales: 650, extrasSales: 200 },
  { label: "Jan 17", totalSales: 600, extrasSales: 300 },
  { label: "Jan 18", totalSales: 550, extrasSales: 100 },
  { label: "Jan 19", totalSales: 700, extrasSales: 100 },
  { label: "Jan 20", totalSales: 800, extrasSales: 200 },
  { label: "Jan 21", totalSales: 700, extrasSales: 100 },
  { label: "Jan 22", totalSales: 810, extrasSales: 50 },
  { label: "Jan 23", totalSales: 950, extrasSales: 250 },
  { label: "Jan 24", totalSales: 970, extrasSales: 100 },
  { label: "Jan 25", totalSales: 900, extrasSales: 200 },
  { label: "Jan 26", totalSales: 950, extrasSales: 300 },
  { label: "Jan 27", totalSales: 850, extrasSales: 200 },
  { label: "Jan 28", totalSales: 900, extrasSales: 100 },
  { label: "Jan 29", totalSales: 800, extrasSales: 300 },
  { label: "Jan 30", totalSales: 950, extrasSales: 200 },
  { label: "Jan 31", totalSales: 1100, extrasSales: 300 },
  { label: "Feb 01", totalSales: 1200, extrasSales: 400 },
  { label: "Feb 02", totalSales: 1250, extrasSales: 300 },
  { label: "Feb 03", totalSales: 1400, extrasSales: 450 },
  { label: "Feb 04", totalSales: 1500, extrasSales: 500 },
  { label: "Feb 05", totalSales: 1400, extrasSales: 600 },
  { label: "Feb 06", totalSales: 1450, extrasSales: 400 },
];


    export default function SalesChart({bookings, numDays}) {
      const {isDarkMode} = useDarkMode();

      //first we compute all the dates we have to check...that is last 7, 30 or 90 days from now according to the filter
      //subDays from date-fns helps us obtain the date as many days before what we subtracted
      //eg: subDays(new Date(2014, 8, 1), 10) would give us the date 10 days before september 1 2014 ie aug 22
      const allDates = eachDayOfInterval({
        start: subDays(new Date(), numDays-1),
        end: new Date()
      });

      //to get total sales...we first only filter dates frm all dates which have a booking created in them...then we add it all using a reducer
      const data = allDates.map((date) => {
        return{
          label: format(date, "MMM dd"), //MM gives index of month and MMM gives name
          totalSales: bookings.filter(booking => isSameDay(date, new Date(booking.created_at))).reduce((acc, curr) => acc+curr.totalPrice, 0),
          extrasSales: bookings.filter(booking => isSameDay(date, new Date(booking.created_at))).reduce((acc, curr) => acc + curr.extrasPrice, 0)
        }
      })


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

      return (
        <StyledSalesChart>
          <Heading as="h2">Sales</Heading>

          <ResponsiveContainer height={300} width="100%">
              <AreaChart data={data} >
                <XAxis dataKey="label" tick={{fill: colors.text}} tickLine={{stroke: colors.text}} />
                <YAxis unit="$" tick={{fill: colors.text}} tickLine={{stroke: colors.text}} />
                <CartesianGrid strokeDasharray="4" />
                <Tooltip contentStyle={{backgroundColor: colors.background}} />

                {/* total sales chart area */}
                <Area 
                dataKey="totalSales"
                 type="monotone" 
                 stroke={colors.totalSales.stroke} 
                 fill={colors.totalSales.fill}
                 strokeWidth={2}
                 name="Total Sales"
                 unit="$" />
                 
                 {/* extras chart area */}
                 <Area 
                dataKey="extrasSales"
                 type="monotone" 
                 stroke={colors.extrasSales.stroke} 
                 fill={colors.extrasSales.fill}
                 strokeWidth={2}
                 name="Extras Sales"
                 unit="$" />
              </AreaChart>
          </ResponsiveContainer>
        </StyledSalesChart>
      )
    }

    SalesChart.propTypes = {
      bookings: PropTypes.object,
      numDays: PropTypes.number,
    };
    
