import axios from 'axios'
import {useParams, useNavigate} from "react-router-dom"
import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../../helpers/AuthContext';
import "./Profile.scss"

const Profile = () => {

    const {authState} = useContext(AuthContext) 
    let {id} = useParams()
    const [username, setUsername] = useState("")
    const [listOfPosts, setListOfPosts] = useState([])
    let navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:3000/auth/basicinfo/${id}`).then((res)=>{
            setUsername(res.data.username)
        })
        axios.get(`http://localhost:3000/posts/byuserId/${id}`).then((res)=>{
            setListOfPosts(res.data)
        })
    },[])

  return (
    <div className='wrapperPostPage'>
        {
          authState.username === username && (
              <button onClick={()=>{navigate("/changepassword")}}>Change my password</button>
          )
        }
        <div className='wrapperPost'>
        {listOfPosts.map((value, key) => {
        return (
          <div className='postId' key={key}>
            <div className='title'>{value.title}</div>
            <div className="text" onClick={()=>{navigate(`/post/${value.id}`)}} >{value.postText}</div>
            <div className='userAndLike'>
              {value.username}
              <label>Likes: {value.Likes.length}</label>
            </div>
          </div>
        )
      })}
    </div>
    </div>
  )
}

export default Profile