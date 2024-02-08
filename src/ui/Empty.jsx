import PropTypes from 'prop-types'

function Empty({ resource }) {
  return <p>No {resource} could be found.</p>;
}

export default Empty;

Empty.propTypes = {
  resource: PropTypes.string.isRequired
}
