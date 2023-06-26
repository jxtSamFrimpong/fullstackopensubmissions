import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { setBlogs } from "../reducers/blogReducer"
import blogService from "../services/blogs"

// export const useCounter = () => {
//     const [value, setValue] = useState(0)
  
//     const increase = () => {
//       setValue(value + 1)
//     }
  
//     const decrease = () => {
//       setValue(value - 1)
//     }
  
//     const zero = () => {
//       setValue(0)
//     }
  
//     return {
//       value, 
//       increase,
//       decrease,
//       zero
//     }
//   }

export const useUsers = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const loggedInUserJSONstring = window.localStorage.getItem('loggedInUser')
        
        const tryBlogs = blogService.getAll(JSON.parse(loggedInUserJSONstring))
          console.log('tryblogs', tryBlogs)
          tryBlogs
          .then(response => dispatch(setUser(JSON.parse(loggedInUserJSONstring))))
          .catch(err => console.log('authentication error, login again'))
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      return {
        user: JSON.parse(window.localStorage.getItem('loggedInUser'))
      }

}
  
export const useBlogs = () =>{
    const user = useSelector(({user}) => user)
    const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      blogService.getAll(user).then(blogsList =>
        dispatch(setBlogs(blogsList))
      )

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
}