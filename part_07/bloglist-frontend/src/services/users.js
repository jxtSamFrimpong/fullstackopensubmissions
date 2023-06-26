import axios from 'axios'
const baseUrl = '/api/users'

export const getUsers = async ({ token = null }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  //console.log('token', token);
  try{
    const request = await axios.get(baseUrl, config)
    console.log('status', request.status)
    if (request.status === 200){
      console.log('returning data', request.data);
      return request.data
    }
    return []
  }
  catch(err){
    console.log(err)
    return []
  }
}