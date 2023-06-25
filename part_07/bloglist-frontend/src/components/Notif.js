import { useSelector } from 'react-redux'

const Notif=()=>{

	const notification = useSelector(({notification}) => notification)
	const notifClass = useSelector(({notifClass}) => notifClass)

	return (
		notification!==null
		?<div className={notifClass}>
		{notification}
		</div>
		:null
		
		)
}

export default Notif