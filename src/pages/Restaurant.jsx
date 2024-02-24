
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from '../features/cabins/CabinTable'
import AddCabin from "../features/cabins/AddCabin";
import RestaurantTableOperations from "../features/restaurant/RestaurantTableOperations";
import RestaurantTable from "../features/restaurant/RestaurantTable";
import AddDish from "../features/restaurant/AddDish";

function Restaurant() {

  return (
<>
<Row type="horizontal">
      <Heading as="h1">Restaurant Menu</Heading>
      <RestaurantTableOperations />
      {/* <img src="https://jaaramkfipybtkkixsmc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg"></img> */}
    </Row>
    <Row>
      <RestaurantTable />
      {/* <Button onClick={() => setShowForm(!showForm)}>Add new cabin</Button>
      {showForm && <CreateCabinForm />} */}
      <AddDish />
    </Row>
</>
  );
}

export default Restaurant;
