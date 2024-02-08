
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from '../features/cabins/CabinTable'
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {

  return (
<>
<Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <CabinTableOperations />
      {/* <img src="https://jaaramkfipybtkkixsmc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg"></img> */}
    </Row>
    <Row>
      <CabinTable />
      {/* <Button onClick={() => setShowForm(!showForm)}>Add new cabin</Button>
      {showForm && <CreateCabinForm />} */}
      <AddCabin />
    </Row>
</>
  );
}

export default Cabins;
