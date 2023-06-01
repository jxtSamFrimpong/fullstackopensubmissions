import axios from 'axios'
const url = '/api/login'

const Login =async(payload)=>{
	const request =  await axios.post(url, payload)
	return request.data
}

export default Login