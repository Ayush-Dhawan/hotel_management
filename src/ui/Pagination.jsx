import styled from "styled-components";
import PropTypes from 'prop-types';
import { useSearchParams } from "react-router-dom";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;



export default function Pagination({count, SIZE}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
  const pageCount = Math.ceil(count / SIZE)

  function prevPage (){
    const prev = currPage === 1 ? currPage : currPage - 1;
    searchParams.set('page', prev)
    setSearchParams(searchParams)
  }

  function nextPage(){
    const next = pageCount === currPage ? currPage : currPage + 1;

    searchParams.set('page', next)
    setSearchParams(searchParams)
  }

  if(pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currPage-1) * SIZE + 1}</span> to <span>{currPage === pageCount ? count : currPage * SIZE}</span> of <span>{count}</span> results.
      </P>
      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currPage === 1}>
          ⬅️<span>Previous</span>
        </PaginationButton>

        <PaginationButton onClick={nextPage} disabled={currPage === pageCount}>
          <span>Next</span>➡️
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  )
}

Pagination.propTypes ={
  count: PropTypes.number,
  SIZE: PropTypes.number
}

