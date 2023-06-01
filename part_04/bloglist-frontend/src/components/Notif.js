const Notif=({message, setMessage, className_})=>{
	setTimeout(()=>{
		if(message){
			setMessage(null)
		}
	}, 5000)

	return (
		<div className={className_}>
		{message!==null
		?message
		:null}
		</div>
		)
}

export default Notif