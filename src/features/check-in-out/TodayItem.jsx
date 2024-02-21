import styled from "styled-components";
import Proptypes from 'prop-types'
import Tag from '../../ui/Tag'
import {Flag} from '../../ui/Flag'
import Button from '../../ui/Button'
import {useNavigate} from 'react-router-dom'
import { useCheckout } from "../bookings/useCheckout";
import { useState } from "react";
import EditCabinModal from "../../ui/EditCabinModal";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

export default function TodayItem({activity}){
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false)
  const {id, status, guests, numNights} = activity;
  const {checkout, isCheckingOut}  = useCheckout();
  const navigate = useNavigate();

  return <>
  
  <StyledTodayItem>
      {status === 'unconfirmed' && <Tag type="green">Arriving</Tag>}
  {status === 'checked-in' && <Tag type="blue">Departing</Tag>}

  <Flag src={guests.countryFlag} alt="country-flag" />

  <Guest>{guests.fullName}</Guest>
  <div>{numNights} nights</div>

  {status === 'unconfirmed' && <Button onClick={() => navigate(`/bookings/${id}`)} size="small" variation="primary"> Check in</Button>}
  {status === 'checked-in' && <Button onClick={() => {setShowModal(!showModal); setModalType((modalType) =>"confirmCheckOut")}}  size="small" variation="danger"> Check out</Button>}
  </StyledTodayItem>
  {showModal && <EditCabinModal type={modalType} showModal={setShowModal} id={id}  />}
  </>
}

TodayItem.propTypes = {
  activity: Proptypes.object
}
