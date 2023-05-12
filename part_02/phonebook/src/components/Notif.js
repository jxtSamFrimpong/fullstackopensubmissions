const Notif = ({ message, class_ }) => {
    if (message === null) {
        return null
    }
    return (
        <div className={class_}>
            {message}
        </div>
    )
}

export default Notif;