import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useCheckin } from "../bookings/useCheckin";
import { useEffect, useState } from "react";
import { getBooking, updateBooking } from "../../services/apiBookings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const {checkin, isCheckingIn} = useCheckin();

  const {isLoading, booking} = useBooking();
  
  // useEffect(() =>{
  //   setConfirmedPaid(booking?.isPaid || false)
  // }, [booking.isPaid])

  let bookingId;
  let guests;
  let totalPrice;
  let numGuests;
  let numNights;
  let hasBreakfast;
  let isPaid;
  let status;

 if(!isLoading){
  bookingId = booking.id;
  guests = booking.guests;
  totalPrice = booking.totalPrice;
  numGuests = booking.numGuests;
  numNights = booking.numNights;
  hasBreakfast = booking.hasBreakfast;
  isPaid = booking.isPaid
  // status = booking.status
 }

 const [confirmPaid, setConfirmedPaid] = useState(isPaid)


 if(isLoading) return <Spinner />

  function handleCheckin() {
    if(!confirmPaid) return;
    checkin(bookingId);
  }

  function handlePaid(){
    setConfirmedPaid(() => !confirmPaid);
    isPaid = confirmPaid
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} paid={confirmPaid} />

      <Box>
        <Checkbox disabled={confirmPaid} checked={confirmPaid} onChange={handlePaid} id="confirm">Paid</Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid} >Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
