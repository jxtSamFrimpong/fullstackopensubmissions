import BlogsHeader from "./BlogsHeader";
import { useSelector } from 'react-redux'
import { 
    useQuery
} from "react-query"
import { getUsers } from '../services/users';
import {
    useParams,
    Link
} from 'react-router-dom'

import {
    useUsers,
    useBlogs
} from '../hooks'

const IndieUser = ()=>{
    const {user} = useUsers()
    useBlogs()
    const id = useParams().id
    //const user = useSelector(({user})=> user)
    const results = useQuery('users', ()=>getUsers(user || {}))
    const indieUser = results?.data?.find(i=> i.id === id)

    return (
        indieUser ?
        <div>
            <BlogsHeader />
            <h1>{indieUser?.name}</h1>
            <h2>Added Blogs</h2>
            <ul>
                {
                    indieUser.blogs.map(
                        i => <li key={i.id}><Link to={`/blogs/${i.id}`}>{i.title}</Link></li>
                    )
                }
            </ul>

        </div>
        : <></>
    )
}

export default IndieUser