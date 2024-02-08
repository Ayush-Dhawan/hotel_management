import styled from "styled-components";
import PropTypes from 'prop-types'
import React from 'react'


const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

export default function Select({options, value, onChange}) {
  return (
    <StyledSelect value={value} onChange={onChange}>
      {options.map((option) => <option value={option.value} key={option.value} >{option.text}</option>)}
    </StyledSelect>
  )
}

Select.propTypes = {
  options : PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
}


