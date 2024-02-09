import React from 'react'
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from '../features/bookings/BookingTable'
import BookingTableOperations from '../features/bookings/BookingTableOperations'
import RequestsTable from '../features/requests/requestsTable';

export default function Requests() {
  return (
    <div>
          <Row type="horizontal">
      <Heading as="h1">Pending Requests</Heading>
    </Row>
    <RequestsTable />
    </div>
  )
}
