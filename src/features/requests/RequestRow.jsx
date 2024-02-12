import styled from "styled-components";
import { format, isToday } from "date-fns";
import PropTypes from 'prop-types'
import {useNavigate} from 'react-router-dom'
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helper";
import { formatDistanceFromNow } from "../../utils/helper";
import useConfirmRequest from "./useConfirmRequest";
import { useState } from "react";
import EditCabinModal from "../../ui/EditCabinModal";
import useDeleteRequest, { useDeleteRequestIndirect } from "./useDeleteRequest";
// import Button from "../../ui/Button";

const Button = styled.button`
font-size: 1rem;
font-weight: 500;
/* background-color: var(--color-brand-500); */
background-color: ${(props) => (props.type === 'decline' ? '#dc3545' : 'var(--color-brand-500)')};
color: var(--color-grey-200);
border: none;
border-radius: 10px;
width: 5.5rem;
padding: 0.5rem;
display: flex;
align-items: center;
justify-content: center;
font-family: "Sono";

&:hover {
    background-color: ${(props) => (props.type === 'decline' ? '#bd2130' : 'var(--color-brand-600)')};
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

function RequestRow({request}) {
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false)

  const {
    id: reqestId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    guests,
    cabins,
  } = request

  const guestName = guests ? guests.fullName : 'Guest Not Available';
  const email = guests ? guests.email : 'Email Not Available';
  const cabinName = cabins ? cabins.name : '001'

  const {confirmRequest, isConfirmingRequest} = useConfirmRequest();
  const {deleteRequest, isDeletingRequest} = useDeleteRequest();
  const {deleteRequestIndirect} = useDeleteRequestIndirect();

  const handleConfirm = () =>{
    console.log("data from handleConfirm", cabins)
    confirmRequest(request)
    deleteRequestIndirect(reqestId)
  }

  // const navigate = useNavigate();

  return (
    <>
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

      {/* <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag> */}

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Button disabled={isConfirmingRequest || isDeletingRequest} onClick={handleConfirm} >Confirm</Button>
      <Button disabled={isConfirmingRequest || isDeletingRequest} onClick={() => {setShowModal(!showModal); setModalType((modalType) =>"deleteRequest")}}  type="decline" >Decline</Button>
    </Table.Row>
    {showModal && <EditCabinModal type={modalType} showModal={setShowModal} id={reqestId} email={email} />}
    </>
  );
}

export default RequestRow;

RequestRow.propTypes = {
    request: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      created_at: PropTypes.any, // Update the type accordingly
      startDate: PropTypes.any,
      endDate: PropTypes.any,
      numNights: PropTypes.number,
      numGuests: PropTypes.number,
      totalPrice: PropTypes.number,
      guests: PropTypes.shape({
        fullName: PropTypes.string,
        email: PropTypes.string,
      }),
      cabins: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  };

// RequestRow.propTypes = {
//   request: PropTypes.shape({
//     id: PropTypes.number,
//     created_at: PropTypes.string,
//     startDate: PropTypes.string,
//     endDate: PropTypes.string,
//     numNights: PropTypes.number,
//     numGuests: PropTypes.number,
//     totalPrice: PropTypes.number,
//     guests: PropTypes.shape({
//       fullName: PropTypes.string,
//       email: PropTypes.string,
//     }),
//     cabins: PropTypes.shape({
//       name: PropTypes.string,
//     }),
//   }),
// };



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
