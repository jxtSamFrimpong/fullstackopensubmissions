import PropTypes from 'prop-types'

const Notify = ({ errorMessage }) => {
    Notify.propTypes = {
        errorMessage: PropTypes.any
    }
    if (!errorMessage) {
        return null
    }
    return (
        <div style={{ color: 'red' }}>
            {errorMessage}
        </div>
    )
}
export default Notify