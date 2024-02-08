import Sortby from "../../ui/Sortby";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        field="status"
        options={[
          { value: "all", text: "All" },
          { value: "checked-out", text: "Checked out" },
          { value: "checked-in", text: "Checked in" },
          { value: "unconfirmed", text: "Unconfirmed" },
        ]}
      />

      <Sortby
        options={[
          { value: 'startDate-desc', text: 'Sort by date (recent first)' },
          { value: 'startDate-asc', text: 'Sort by date (earlier first)' },
          { value: 'totalPrice-desc', text: 'Sort by amount (high first)' },
          { value: 'totalPrice-asc', text: 'Sort by amount (low first)' },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
