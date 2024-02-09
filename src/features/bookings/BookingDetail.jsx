import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from '../../ui/Spinner'

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import {useNavigate} from 'react-router-dom'
import { useCheckout } from "./useCheckout";
import { useDeleteBookings } from "./useDeleteBookings";
import { useState } from "react";
import EditCabinModal from "../../ui/EditCabinModal";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {isLoading, booking}= useBooking();
  const navigate = useNavigate();
  const [modalType, setModalType] = useState("")
  const [showForm, setShowForm] = useState(false);

  let bookingId
  let status
  
  if(!isLoading){
    bookingId = booking?.id ||1;
    status = booking?.status || "unconfirmed";
  }

  const {checkout, isCheckingOut} = useCheckout();
  const {deleteBooking, isDeleting} = useDeleteBookings();

  const moveBack = useMoveBack(); 

  function handleCheckout(){
    checkout(bookingId)
  }

  function handleDelete(){
      deleteBooking(bookingId)
  }

  

  const statusToTagName = {
    "unconfirmed": "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if(isLoading) return <Spinner />
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
      {status === 'unconfirmed' &&
      <Button variation="primary" onClick={() => navigate(`/checkin/${bookingId}`)}>
      Check-in
    </Button>}
    {status === 'checked-in' &&
      <Button disabled={isCheckingOut} variation="primary" onClick={handleCheckout}>
      Check-out
    </Button>}
    <Button disabled={isDeleting} variation="secondary" onClick={() =>{setShowForm(!showForm); setModalType((modalType) => "deleteBooking")}}>
          Delete
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>

      {showForm && <EditCabinModal showModal={setShowForm}  type={modalType} id={bookingId} />}
    </>
  );
}

export default BookingDetail;
