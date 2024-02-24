import React from 'react'
import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import Sortby from '../../ui/Sortby'
import AddDish from './AddDish'


export default function RestaurantTableOperations() {
    const filterOptions = [
        {value : "all",
        text: 'All'},
        {value : "veg",
         text: 'Vegetarian'},
         {value : "nonveg",
         text: 'Non-vegetarian'},
    ]

    const filterOptions2 = [
        {value : "all",
        text: 'All'},
        {value : "maincourse",
         text: 'Main course'},
         {value : "starter",
         text: 'Starters'},
         {value : "dessert",
         text: 'Dessert'},
    ]

   
  return (
    <TableOperations>
        <Filter field = "category" options = {filterOptions}/>
        <Filter field = "type" options = {filterOptions2}/>
        <AddDish />
    </TableOperations>
  )
}
