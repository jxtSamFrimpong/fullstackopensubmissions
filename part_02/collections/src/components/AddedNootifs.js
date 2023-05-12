const AddedNotif = ({ addedNotifMesage, addedClass }) => {
    if (addedNotifMesage === null) {
        return null
    }
    return (
        <div className={addedClass}>
            {addedNotifMesage}
        </div>
    )
}

export default AddedNotif;