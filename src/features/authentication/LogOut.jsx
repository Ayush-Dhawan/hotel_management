import React from 'react'
import ButtonIcon from '../../ui/ButtonIcon'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import { useLogout } from './useLogout'
import SpinnerMini from '../../ui/SpinnerMini';

export default function LogOut() {
    const {logout, isLoggingOut} = useLogout();

    function handleClick(){
        logout();
    }
  return (
    <ButtonIcon disabled={isLoggingOut}>
        {!isLoggingOut ? <HiArrowRightOnRectangle onClick={handleClick} /> : <SpinnerMini />}
    </ButtonIcon>
  )
}
