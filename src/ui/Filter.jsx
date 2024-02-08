import styled, { css } from "styled-components";
import PropTypes from 'prop-types'
import {useSearchParams} from 'react-router-dom'

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Filter({field, options}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(field) || options[0].value;
  
  function handleClick(value){
    searchParams.set(field, value);
    setSearchParams(searchParams)
  }
  return (
    <StyledFilter>
      {/* <FilterButton onClick={() => handleClick("all")}>All</FilterButton>
      <FilterButton onClick={() => handleClick("no-discount")}>No discount</FilterButton>
      <FilterButton onClick={() => handleClick("with-discount")}>With discount</FilterButton> */}
      {options.map((option)=> <FilterButton key={option.value} onClick={() => handleClick(option.value)}
      active={option.value === currentFilter}
      disabled={option.value === currentFilter}>{option.text}</FilterButton>)}
    </StyledFilter>
  )
}

Filter.propTypes = {
  field: PropTypes.string,
  options: PropTypes.array,
}
