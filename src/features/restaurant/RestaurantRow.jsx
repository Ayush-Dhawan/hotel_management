import styled from "styled-components";
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import {formatCurrency} from '../../utils/helper'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import { deleteCabins } from "../../services/apiCabins";
import toast, {Toaster} from 'react-hot-toast'
import CreateCabinForm from '../cabins/CreateCabinForm'
import useDeleteCabin from "../cabins/useDeleteCabin";
import useCreateCabin from "../cabins/useCreateCabin";
import EditCabinModal from "../../ui/EditCabinModal";
import Modal from "../../ui/Modal"
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import CreateDishForm from "./CreateDishForm";
import useDeleteDish from "./useDeleteDish";


// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Type = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const StyledButton = styled.button`
  width: 25%;
  text-align: center;
  background: none;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1.4rem;
  /* transition: all 0.2s; */

  /* display: flex;
  align-items: center;
  gap: 1.6rem; */

  &:hover {
    background-color: var(--color-grey-50);
  }

  /* & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  } */
`;



const RestaurantRow = ({ dish }) => {
  const {id: dishId, dishName, type, category, price, image, description} = dish;
  const color = category === "VEG" ? '#28b485' : '#f06464';
  const [showForm, setShowForm] = useState(false);
  const [modalType, setModalType] = useState("")

  const {deleteDish, isDeleting} = useDeleteDish();
  // Your component logic here

  return (
    <div>
      <Table.Row role = "row">
        <Img src = {image} />
        <Cabin>{dishName}</Cabin>
        <div style={{color: `${color}`, fontWeight: '600'}}>{category}</div>
        <Type>{type}</Type>
        <Price>{ formatCurrency(price) }</Price>
        <div>
          {/* <button disabled={isCreating} onClick={handleDuplicate}>©️</button> */}
          <StyledButton onClick={() =>{ setShowForm(!showForm); setModalType((modalType) => "edit-dish")}}><HiPencil /></StyledButton>
          {/* <button ><EditCabin /></button> */}
        <StyledButton onClick={() =>{ setShowForm(!showForm); setModalType((modalType) => "delete-dish")}} disabled={isDeleting}><HiTrash /></StyledButton>
        {/* <Modal.Window>
          <ConfirmDelete resourceName="cabins" disabled={isDeleting} onConfirm={() => deleteCabin(cabinid)} />
        </Modal.Window> */}

        </div>

      </Table.Row>

      {/* {showForm && <CreateDishForm dishToEdit={dish}/>}  */}
      {showForm && <EditCabinModal showModal={setShowForm} dish={dish} type={modalType} id={dishId} />}

    </div>
  );
};

RestaurantRow.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    dishName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
    // Add other properties as needed
  }),
};


export default RestaurantRow;


