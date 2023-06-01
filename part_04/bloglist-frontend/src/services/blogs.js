import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async({token}) => {
  const config = {
    headers: {Authorization: `Bearer ${token}`}
  }

  const request = await axios.get(baseUrl, config)
  return request.data//.then(response => response.data)
}

const createBlog =async(data, token)=>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  try{
    const request = await axios.post(baseUrl, data, config)
    return request.data
  }catch(err){
    console.log(err)
    throw Error(err.response.data.error)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog }