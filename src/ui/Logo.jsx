import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 11rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/myLogo-light.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
