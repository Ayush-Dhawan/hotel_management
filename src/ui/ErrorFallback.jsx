import styled from "styled-components";
import PropTypes from 'prop-types';
import React from 'react'
import Heading from './Heading'
import Button from "./Button";


const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;


export default function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <StyledErrorFallback>
      <Box>
        <Heading as="h1">Something went wrong🥲</Heading>
        <p>{error.message}</p>
        <Button onClick={() => resetErrorBoundary()} size="large">Try Again</Button>
      </Box>
    </StyledErrorFallback>
  )
}

ErrorFallback.propTypes = {
  error: PropTypes.instanceOf(Error),
  resetErrorBoundary: PropTypes.any
}

