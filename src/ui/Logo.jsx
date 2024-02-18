import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 11rem;
  width: auto;
`;

function Logo() {
  const {isDarkMode,  toggleDarkMode} = useDarkMode();
  return (
    <StyledLogo>
      <Img src={isDarkMode ? "/myLogo-dark.png" : "/myLogo-light.png"} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
