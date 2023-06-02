const CancelLogin = ({ setLoginVisible }) => {
    const handler = () => {
        setLoginVisible(false)
    }
    return (
        <button type="submit" onClick={handler}>
            Cancel
        </button>
    )
}

export default CancelLogin