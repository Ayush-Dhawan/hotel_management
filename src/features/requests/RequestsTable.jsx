import React from 'react'
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useRequests } from './useRequests';
import RequestRow from './RequestRow';
import Spinner from '../../ui/Spinner';




export default function RequestsTable() {

    const {isLoading, requests} = useRequests();
    console.log("data from req table", requests)


    if(isLoading) return <Spinner />

  return (
    <Menus>
    <Table columns="2fr 3fr 3.5fr 1.4fr 0.7fr 7rem">
      <Table.Header>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>

      {requests &&
      <Table.Body
      data={requests}
      render={(request) => (
        <RequestRow key={request.id} request={request} />
      )}
    />}

    </Table>
  </Menus>
  )
}
