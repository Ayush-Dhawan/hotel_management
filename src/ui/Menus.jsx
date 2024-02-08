import styled from "styled-components";
import Proptypes from 'prop-types'
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext()

export default function Menus({children}) {
  const [openId, setOpenId] = useState('')
  const [position, setPosition] = useState(null)

  const close = () => setOpenId('');
  const open = setOpenId
  return (
    <MenusContext.Provider value={{openId, close, open, position, setPosition}}>
      {children}
    </MenusContext.Provider>
  )
}

function Toggle({id}){
  const {openId, close, open, setPosition} = useContext(MenusContext)
  function handleClick(e){
    const rect = e.target.closest('button').getBoundingClientRect()
    console.log(rect)

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }
  return <StyledToggle onClick={() =>handleClick}>
    {/* <HiEllipseisVertical /> */}
    🖋️
  </StyledToggle>
}

function List({id, children}){
  const {openId, position} = useContext(MenusContext);

  if(openId !== id) return null;
  
  return createPortal(
  <StyledList position= {position}>{children}</StyledList>,
  document.body
  )
 
}

function Button({children}){
  return <li>
    <StyledButton>{children}</StyledButton>
  </li>
}

Menus.propTypes = {
  children : Proptypes.any
}
Button.propTypes = {
  children : Proptypes.any
}
Toggle.propTypes = {
  id : Proptypes.any
}
List.propTypes = {
  id : Proptypes.any,
  children: Proptypes.any
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button