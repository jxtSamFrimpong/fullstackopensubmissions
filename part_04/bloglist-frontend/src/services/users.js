import axios from "axios";

const baseUrl = '/api/users' 

const getUser = async({token})=>{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
    
      const request = await axios.get(`${baseUrl}`, config)
      return request.data
}