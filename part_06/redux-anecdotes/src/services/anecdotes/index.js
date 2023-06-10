import axios from 'axios'

const baseUri = 'http://localhost:3001/anecdotes'

const getAll=async()=>{
    const response = await axios.get(baseUri)
    return response.data
}

const upVote = async(body)=>{
    const object = {
        ...body,
        votes: body.votes + 1
    }
    const response = await axios.put(`${baseUri}/${body.id}`, object)
    return response.data
}

const createDote = async(body)=>{
    const response = await axios.post(baseUri, body)
    return response.data
}

export default {
    getAll,
    upVote,
    createDote
}