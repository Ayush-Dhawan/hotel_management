import React from 'react'
import styled from "styled-components";
import { useRecentBookings } from './useRecentBookings';
import Spinner from '../../ui/Spinner'
import { useRecentStays } from './useRecentStays';
import Stats from './Stats';
import useCabins from '../../features/cabins/useCabins'
import SalesChart from './SalesChart';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;



export default function DashboardLayout() {
  const {bookings, isLoading} = useRecentBookings();

  const {stays, isLoading: isLoadingStays, confirmedStays, numDays} = useRecentStays();
  const {cabins, isLoading: isLoadingCabins} = useCabins();

  if(isLoading || isLoadingStays) return <Spinner />
  
  return (
    <div>
      <StyledDashboardLayout>
        <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} numCabins = {cabins?.length} />
        <div>Today&apos;s activity</div>
        <div>Chart stay durations</div>
        <SalesChart bookings={bookings} numDays={numDays} />
      </StyledDashboardLayout>
    </div>
  )
}

