import React, { useEffect, useRef } from 'react'
import styled from "styled-components";
import CreateCabinForm from '../features/cabins/CreateCabinForm';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom'
import ConfirmDelete from './ConfirmDelete';
import useDeleteCabin from '../features/cabins/useDeleteCabin';
import { useDeleteBookings } from '../features/bookings/useDeleteBookings';
import useDeleteRequest from '../features/requests/useDeleteRequest';
import useDeleteGuests from '../features/requests/useDeleteGuests';
import { useCheckout } from '../features/bookings/useCheckout';

// import Button  from './Button';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;



export default function EditCabinModal({showModal, cabin, type, id, email}) {
  const {isDeleting, deleteCabin} = useDeleteCabin();
  const {isDeletingRequest, deleteRequest} = useDeleteRequest()
  const {deleteGuest, isDeletingGuest} = useDeleteGuests();
  const {checkout, isCheckingOut}  = useCheckout();
  const {isDeleting: isDeletingBooking, deleteBooking} = useDeleteBookings();

  const ref = useRef();

  useEffect(() =>{
    function handleClick(e){
      if(ref.current && !ref.current.contains(e.target)) showModal(false)
    }
    document.addEventListener('click', handleClick, true)

    return () => document.removeEventListener('click', handleClick, true)
  }, [showModal])
if(type === "edit"){
  return (
    <Overlay>
        <StyledModal ref={ref}>
            <Button onClick={() => showModal(false)}>❌</Button>
            <CreateCabinForm  cabinToEdit={cabin} showEditModal={showModal}/>
         </StyledModal>
    </Overlay>
  )
}  else if(type === "delete"){
  return (
    <Overlay>
        <StyledModal ref={ref}>
            <Button onClick={() => showModal(false)}>❌</Button>
            <ConfirmDelete resourceName="cabins" disabled={isDeleting} onConfirm={() => deleteCabin(id)} showModal={showModal} />
         </StyledModal>
    </Overlay>
  )
} else if(type === "deleteBooking"){
  return (
    <Overlay>
        <StyledModal ref={ref}>
            <Button onClick={() => showModal(false)}>❌</Button>
            <ConfirmDelete resourceName="booking" disabled={isDeletingBooking}  onConfirm={()=>{deleteBooking(id); 
   setTimeout(() => {
    deleteGuest(email)
   }, 2000);}} showModal={showModal} />
         </StyledModal>
    </Overlay>
  )
}
else if(type === "deleteRequest"){
  return (
    <Overlay>
        <StyledModal ref={ref}>
            <Button onClick={() => showModal(false)}>❌</Button>
            <ConfirmDelete resourceName="request" disabled={isDeletingRequest} onConfirm={()=>{deleteRequest(id); 
   setTimeout(() => {
    deleteGuest(email)
   }, 2000);}} showModal={showModal} />
         </StyledModal>
    </Overlay>
  )
}
else if(type === "confirmCheckOut"){
  return (
    <Overlay>
        <StyledModal ref={ref}>
            <Button onClick={() => showModal(false)}>❌</Button>
            <ConfirmDelete confirm={true} resourceName="Check out" disabled={isCheckingOut} onConfirm={()=>{checkout(id);}} showModal={showModal} />
         </StyledModal>
    </Overlay>
  )
}
}

EditCabinModal.propTypes = {
    cabin: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.any,
    email: PropTypes.string,
  };
