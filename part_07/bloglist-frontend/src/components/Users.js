import { useSelector } from 'react-redux'
import { 
    useQuery
} from "react-query"
import {
    Link
} from 'react-router-dom'

import {
    useUsers,
    useBlogs
} from '../hooks'

import { getUsers } from '../services/users';

import BlogsHeader from "./BlogsHeader";

const Users = ()=>{
    useUsers()
    useBlogs()
    const user = useSelector(({user}) => user)
    //const queryClient = useQueryClient()

    let results = useQuery('users', ()=>getUsers(user || {}))
    console.log('results', results)
    const users = results.data
    return (
        <div>
            <BlogsHeader />
            <section>
            <h2>
                Users
            </h2>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Names</th>
                        <th>Blogs Created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map(
                            user => <tr key={user.id}>
                                <td>
                                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                                </td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </section>
        </div>
    )
}

export default Users;