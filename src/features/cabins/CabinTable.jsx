import styled from "styled-components";
import {useQuery} from '@tanstack/react-query'
import { getCabins } from "../../services/apiCabins";
import Spinner from '../../ui/Spinner'
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import Pagination from "../../ui/Pagination";
import { CABIN_TABLE_SIZE, PAGE_SIZE } from "../../utils/constants";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1.5fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

export default function CabinTable(){
  const {isLoading, data: cabins, error} = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins
  })

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  
  const filterApplied = searchParams.get("discount") || "all";
  const sortApplied = searchParams.get('sortby') || 'name-asc'

  const currPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));




  let filteredValues;

  if(filterApplied === "all"){
      filteredValues = cabins
  }
  else if(filterApplied === "no-discount"){

    filteredValues = cabins.filter(cabin => cabin.discount === 0)
  }
  else{
    filteredValues = cabins.filter((cabin) => cabin.discount > 0)
  }

  const [field, direction] = sortApplied.split('-');
  const modifier = direction === 'asc' ? 1 : -1
  const sortedValues = filteredValues?.sort((a, b) => (a[field] - b[field])*modifier)

const from = (currPage - 1) * CABIN_TABLE_SIZE; //standard formula for paginations
const to = from + CABIN_TABLE_SIZE -1;

//this is done to avoid pagination bug...we cant stay on say page 3 when we have only as much content as 2 pages
if(sortedValues && currPage > Math.ceil(sortedValues.length / CABIN_TABLE_SIZE)){
  navigate(`/cabins?page=1&discount=${filterApplied}&sortby=${sortApplied}`)
}
const cabinsInRange = sortedValues?.slice(from, to+1) //render the slice of total values from and to+1


  if(isLoading) return <Spinner />
  return <Menus>
     <Table role = "table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1.5fr">
    <TableHeader role = "row">
      <div></div>
      <div>Cabin</div>
      <div>Capacity</div>
      <div>Price</div>
      <div>Discount</div>
      <div></div>
    </TableHeader>
    <Table.Body data={cabinsInRange} render={(cabin => <CabinRow cabin={cabin} key={cabin.id} />)} />
    {/* {cabins.map(cabin => <CabinRow cabin={cabin} key={cabin.id} />)} */}
    <Table.Footer>
      <Pagination count={sortedValues.length} SIZE={CABIN_TABLE_SIZE} />
    </Table.Footer>
  </Table>
  </Menus>
}
