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

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {isLoading, booking}= useBooking();
  const navigate = useNavigate();

  let bookingId
  let status
  
  if(!isLoading){
    bookingId = booking?.id ||1;
    status = booking?.status || "unconfirmed";
  }

  const {checkout, isCheckingOut} = useCheckout();

  const moveBack = useMoveBack(); 

  function handleCheckout(){
    checkout(bookingId)
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
      <Button variation="primary" onClick={handleCheckout}>
      Check-out
    </Button>}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
