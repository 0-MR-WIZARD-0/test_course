import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"
import "./Home.scss"

const Home = () => {

    const [listOfPosts, setListPosts] = useState([])
    const [likedPosts, setLikedPosts] = useState([])

    let navigate = useNavigate()

    useEffect(()=>{
      if(!localStorage.getItem("accessToken")){
        navigate("/login")
      }else{
        axios
          .get("http://localhost:3000/posts", {
            headers: {
              accessToken: localStorage.getItem("accessToken")
            }
          })
          .then((res) => {
            setListPosts(res.data.listOfPosts)
            setLikedPosts(res.data.likedPosts.map((like)=>{
              return like.PostId
            }))
          })
      }
    },[])

    const likeAPost = (postId) => {
      axios.post("http://localhost:3000/likes", 
        {PostId: postId},
        {headers: {
          accessToken: localStorage.getItem("accessToken")
        }}
      ).then((res)=>{
        setListPosts(listOfPosts.map((post)=>{
          if(post.id === postId){
            if(res.data.liked){
              return {...post, Likes: [...post.Likes, 0]}
            }else{
              const likeArr = post.Likes
              likeArr.pop()
              return {...post, Likes: likeArr}
            }
          }else{
            return post
          }
        })
      )
        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id)=>{
              return id != postId
            })
          )
        }else{
          setLikedPosts([...likedPosts, postId])
        }
      })
    }

  return (

    <div className='HomePage'>
        {listOfPosts.map((value, key) => {
        return (
          <div key={key}>
            <div className='title'>{value.title}</div>
            <div onClick={()=>{navigate(`/post/${value.id}`)}} className="text">{value.postText}</div>
            <div className='userAndLike'>
              <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
              <ThumbUpAltIcon 
                onClick={()=>{likeAPost(value.id)}}
                className={likedPosts.includes(value.id) ? "like" : "unlike"}/>
              <label>{value.Likes.length}</label>
            </div>
          </div>
          
        )
      })}
    </div>
  )
}

export default Home