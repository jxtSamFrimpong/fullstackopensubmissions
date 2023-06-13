import { useContext } from "react"
import NotifContext from "../NotifContext"

const Notification = () => {
  const [notif, dispatch] = useContext(NotifContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
    {notif}      
    </div>
  )
}

export default Notification
