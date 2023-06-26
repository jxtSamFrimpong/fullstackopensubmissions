import { useSelector} from 'react-redux'
import Notif from './Notif'
import Logout from './Lougt'

const BlogsHeader =()=>{
    const notification = useSelector(({notification})=> notification)
    const username = useSelector(({user}) => user?.username)
    return (
        <>
            <h2>blogs</h2>
      {notification !== null ?
        <Notif /> :
        null}
      <div>{username} is logged in
        <Logout />
      </div>
        </>
    )
}

export default BlogsHeader