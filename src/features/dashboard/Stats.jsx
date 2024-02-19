import PropTypes from 'prop-types';
import React from 'react'
import Stat from './Stat'
import {HiOutlineBriefcase, HiOutlineBanknotes, HiOutlineCalendarDays, HiOutlineChartBar} from "react-icons/hi2"
import { formatCurrency } from '../../utils/helper';

export default function Stats({bookings, confirmedStays, numDays, numCabins}) {
    const numBookings = bookings.length;
    const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
    const checkins = confirmedStays.length;

    //number of checked in nights / all available nights -> (numDays * numCabins)
    const occupation = confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0)
    const nights = numDays * numCabins;

    const OccupanyRate = occupation/nights;

  return (
    <>
      <Stat title='Bookings' color = "blue" icon={<HiOutlineBriefcase />} value={numBookings} />
      <Stat title='Sales' color = "green" icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
      <Stat title='check ins' color = "indigo" icon={<HiOutlineCalendarDays />} value={checkins} />
      <Stat title='Occupany Rate' color = "yellow" icon={<HiOutlineChartBar />} value={Math.round(OccupanyRate * 100) + "%"} />
    </>
  )
}

Stats.propTypes = {
    bookings: PropTypes.object.isRequired,
    confirmedStays: PropTypes.object.isRequired,
    numDays: PropTypes.number,
    numCabins: PropTypes.number,
  };