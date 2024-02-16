import React from 'react'
import styled from 'styled-components'
import Logout from '../features/authentication/LogOut'
import ButtonIcon from './ButtonIcon'
import { HiOutlineUser } from 'react-icons/hi2'
import {useNavigate} from 'react-router-dom'

const StyledHeaderMenu = styled.ul`
display: flex;
gap: 0.4rem;
`



export default function HeaderMenu() {
    const navigate = useNavigate();

  return (
    <StyledHeaderMenu onClick={() => navigate("/account")}>
        <li>
            <ButtonIcon>
                <HiOutlineUser />
            </ButtonIcon>
        </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  )
}
