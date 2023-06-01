import { useState } from "react"
const WelcomeUser = ({ addedNotifMesage, addedClass }) => {

    const [someMessage, setSomeMessage] = useState(addedNotifMesage)
    setTimeout(() => {
        setSomeMessage(null)
    }, 5000)

    if (someMessage === null) {
        return null
    }
    return (
        <div className={addedClass}>
            {someMessage}
        </div>
    )
}

export default WelcomeUser;