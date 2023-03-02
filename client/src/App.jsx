import axios from 'axios';
import { useState, useEffect } from 'react';
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import { AuthContext } from './helpers/AuthContext';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import CreatePost from './pages/CreatePost/CreatePost';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Post from './pages/Post/Post';
import Profile from './pages/Profile/Profile';
import Registration from './pages/Registration/Registration';
import "./App.scss"

function App() {

  let navigate = useNavigate()
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  })

  useEffect(()=>{
    axios.get("http://localhost:3000/auth/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((res)=>{
      if(res.data.error){
        setAuthState({...authState, status: false})
      }else{
        setAuthState({
          username: res.data.username,
          id: res.data.id,
          status: true
        })
      }
    })
  },[])

  const logout = () => {
    localStorage.removeItem("accessToken")
    setAuthState({
      username: "",
      id: 0,
      status: false
    })
    navigate("/login")
  }

  return (
    <div className='App'>
      <AuthContext.Provider value={{authState, setAuthState}}>
        <div className='navbar'>
        {
          !authState.status ? (
            <>
               <Link to="/login">Login</Link>
               <Link to="/registration">Registration</Link>
            </>
          ) : (
            <>
              <Link to="/createpost">Create Post</Link>
              <Link to="/">Home Page</Link>
            </>
          )
        }
        <div>
          <h1><Link to={`/profile/${authState.id}`}>{authState.username}</Link></h1>
          {authState.status && <button onClick={logout}>Logout</button>}
        </div>
      </div> 
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/createpost' element={<CreatePost/>}/>
        <Route path='/post/:id' element={<Post/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
        <Route path='/changepassword' element={<ChangePassword/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      </AuthContext.Provider>
    </div>
  )
}

export default App;
