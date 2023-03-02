import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../helpers/AuthContext';
import './Post.scss'

const Post = () => {

    let {id} = useParams()
    const [postObj, setPostObj] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const {authState} = useContext(AuthContext) 
    let navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:3000/posts/byId/${id}`).then( res => {
            setPostObj(res.data)
        })

        axios.get(`http://localhost:3000/comments/${id}`).then( res => {
            setComments(res.data)
        })
    },[])

    const addComment = () => {
      axios
        .post('http://localhost:3000/comments', {
            commentBody: newComment, PostId: id
        }, 
        {
          headers: {
            accessToken: localStorage.getItem("accessToken")
          }
        })
        .then((res)=>{
          if(res.data.error){
            console.log(res.data.error)
          }else{
            const commentToAdd = {commentBody: newComment, username: res.data.username}
            setComments([...comments, commentToAdd])
            setNewComment("")
          }
        })
    }

    const deleteComment = (id) => {
      axios.delete(`http://localhost:3000/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }
      }).then(()=>{
        setComments(comments.filter((val)=>{
          return val.id != id
        }))
      })
    }

    const deletePost = (id) => {
      axios.delete(`http://localhost:3000/posts/${id}`,{
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }
      }).then(()=>{
        navigate("/")
      })
    }

    const editPost = (option) => {
      if (option === "title"){
        let newTitle = prompt("Enter new title: ")
        axios.put("http://localhost:3000/posts/title", {newTitle: newTitle, id: id}, {
          headers: {
            accessToken: localStorage.getItem("accessToken")
          }
        }).then(res=>console.log(res))
        setPostObj({...postObj, title: newTitle})
      }else{
        let newPostText = prompt("Enter new post text")
        // console.log();
        axios.put("http://localhost:3000/posts/postText", {newTitle: newPostText, id: id}, {
          headers: {
            accessToken: localStorage.getItem("accessToken")
          }
        }).then(res=>console.log(res))
        setPostObj({...postObj, postText: newPostText})
      }
    }

  return (
    <div className='postPage'>
      <div className='_info'>
        <div onClick={()=>{
          if(authState.username === postObj.username){
            editPost("title")
          }
        }}>{postObj.title}</div>
        <hr/>
        <div onClick={()=>{
          if(authState.username === postObj.username){
            editPost("body")
          }
        }}>{postObj.postText}</div>
        <div>
          {postObj.username}
          {authState.username === postObj.username && <button onClick={()=>{deletePost(postObj.id)}}>Delete post</button>} 
        </div>
      </div>
      <div>
        <div>
          <input type="text" placeholder='Comment..' value={newComment} onChange={e=>setNewComment(e.target.value)}/>
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div>
          {comments.map((comment, key)=>{
            return (
                <div className='comment' key={key}>
                  {comment.commentBody}
                  <label>{comment.username}</label>
                  {
                    authState.username === comment.username &&
                    <button onClick={()=>{deleteComment(comment.id)}}>Delete</button>
                    
                  }
                </div>
            )
          })}
        </div>
      </div>
    </div>
    
  )
}

export default Post