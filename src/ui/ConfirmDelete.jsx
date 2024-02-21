import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading"
import PropTypes from 'prop-types';

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, showModal, confirm=false }) {
  return (
      <StyledConfirmDelete>
      {!confirm ?<Heading as="h3">Delete {resourceName}</Heading> : <Heading as="h3">Confirm {resourceName}</Heading> }
      {!confirm ? <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p> : <p>
        Are you sure you want to perform this action?
      </p>}

      <div>
        <Button variation="secondary" disabled={disabled} onClick={() =>showModal(false)}>
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          {!confirm ? "Delete" : "Confirm"}
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}


export default ConfirmDelete;

ConfirmDelete.propTypes = {
  resourceName : PropTypes.string.isRequired,
  onConfirm : PropTypes.bool.isRequired,
  disabled : PropTypes.bool.isRequired,
  showModal: PropTypes.func,
  confirm: PropTypes.bool,
}
