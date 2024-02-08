import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from '../../ui/Empty'
import {useBookings} from './useBookings'
import Spinner from '../../ui/Spinner'
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import {PAGE_SIZE} from '../../utils/constants'
import {useNavigate} from 'react-router-dom'

function BookingTable() {
  const navigate = useNavigate();
  const {bookings, isLoading} = useBookings();
  console.log(bookings)
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status") || "all"
  const sortType = searchParams.get("sortby") || "startDate-desc";

  const currPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  let filteredValues;
  if(status === "all"){
    filteredValues = bookings
  }
  else if(status === "checked-out"){
    // searchParams.set("status", "checked-out")
    // searchParams.set('page', 1)
    // setSearchParams(searchParams)
    filteredValues = bookings.filter(booking => booking.status === "checked-out")
  }
  else if(status === "checked-in"){
    // searchParams.set("status", "checked-in")
    // searchParams.set('page', 1)
    // setSearchParams(searchParams)
    filteredValues = bookings.filter(booking => booking.status === "checked-in")

  }
  else if(status === "unconfirmed"){
    // searchParams.set("status", "unconfirmed")
    // searchParams.set('page', 1)
    // setSearchParams(searchParams)
    filteredValues = bookings.filter(booking => booking.status === "unconfirmed")
  }


  const [field, direction] = sortType.split("-")
  const mutator = direction === "desc" ? -1 : 1;
  const sortedValues = filteredValues?.sort((a, b) => {
    // Assuming a[field] and b[field] are strings (e.g., dates)
    if (typeof a[field] === "string" && typeof b[field] === "string") {
      return a[field].localeCompare(b[field]) * mutator;
    }
  
    // For numeric values
    return (a[field] - b[field]) * mutator;
  });


  const from = (currPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE -1;

  // If current page is greater than the available pages, navigate to the first page
  if (currPage > Math.ceil(sortedValues.length / PAGE_SIZE)) {
   navigate(`/bookings?page=1&status=${status}&sortby=${sortType}`);
 }
 
 const bookingsInRange = sortedValues?.slice(from, to+1)




  // if(!bookings.length) return <Empty resource = "bookings" />
  if(isLoading) return <Spinner />

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookingsInRange}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={sortedValues.length} SIZE={PAGE_SIZE} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
