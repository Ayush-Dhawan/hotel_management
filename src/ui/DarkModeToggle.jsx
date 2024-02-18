import React from 'react'
import ButtonIcon from './ButtonIcon'
import {HiOutlineMoon, HiOutlineSun} from 'react-icons/hi2'
import { useDarkMode } from '../context/DarkModeContext'

export default function DarkModeToggle() {
    const {isDarkMode,  toggleDarkMode} = useDarkMode();
  return (
    <div>
      <ButtonIcon onClick={toggleDarkMode}>
        {!isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun /> }
         </ButtonIcon>
    </div>
  )
}
