import React from 'react'
import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import Sortby from '../../ui/Sortby'


export default function CabinTableOperations() {
    const filterOptions = [
        {value : "all",
         text: 'All'},
         {value : "no-discount",
         text: 'No discount'},
         {value : "with-discount",
         text: 'With Discount'},
    ]

    const sortOptions = [
        {
            value: "name-asc",
            text: "Sort by name (A-Z)"
        },
        {
            value: "name-dec",
            text: "Sort by name (Z-A)"
        },
        {
            value: "regularPrice-asc",
            text: "Sort by Price (A-Z)"
        },
        {
            value: "regularPrice-dec",
            text: "Sort by Price (Z-A)"
        },
        {
            value: "maxCapacity-asc",
            text: "Sort by Capacity (A-Z)"
        },
        {
            value: "maxCapacity-dec",
            text: "Sort by Capacity (Z-A)"
        }
    ]
  return (
    <TableOperations>
        <Filter field = "discount" options = {filterOptions}/>
        <Sortby  options={sortOptions} />
    </TableOperations>
  )
}
