import React, { useState } from 'react'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal';
import CreateCabinForm from '../../features/cabins/CreateCabinForm'
import CreateDishForm from './CreateDishForm';

export default function AddDish() {
    return (
      <div>
        <Modal>
          <Modal.Open opens="cabin-form">
            <Button size="small">Add new dish</Button>
          </Modal.Open>
          <Modal.Window name="cabin-form">
            <CreateDishForm />
          </Modal.Window>
        </Modal>
      </div>
    );
  }