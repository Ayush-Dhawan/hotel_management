import styled from "styled-components";
import { format, isToday } from "date-fns";
import PropTypes from 'prop-types'
import {useNavigate} from 'react-router-dom'
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helper";
import { formatDistanceFromNow } from "../../utils/helper";
// import Button from "../../ui/Button";

const Button = styled.button`
font-size: 1rem;
font-weight: 500;
background-color: var(--color-brand-500);
color: var(--color-grey-200);
border: none;
border-radius: 10px;
width: 5.5rem;
font-family: "Sono";

  &:hover{
    background-color: var(--color-brand-600);
  }
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests,
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
    const guestName = guests ? guests.fullName : 'Guest Not Available';
  const email = guests ? guests.email : 'Email Not Available';

  const navigate = useNavigate();

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Button onClick={() => navigate(`/bookings/${bookingId}`)}>See Details</Button>
    </Table.Row>
  );
}

export default BookingRow;

BookingRow.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number,
    created_at: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    numNights: PropTypes.number,
    numGuests: PropTypes.number,
    totalPrice: PropTypes.number,
    status: PropTypes.string,
    guests: PropTypes.shape({
      fullName: PropTypes.string,
      email: PropTypes.string,
    }),
    cabins: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

// booking: {
//   id: bookingId,
//   created_at,
//   startDate,
//   endDate,
//   numNights,
//   numGuests,
//   totalPrice,
//   status,
//   guests: { fullName: guestName, email },
//   cabins: { name: cabinName },
// },
