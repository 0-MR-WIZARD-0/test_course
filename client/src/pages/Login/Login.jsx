import axios from 'axios'
import { useState, useContext } from 'react'
import {useNavigate} from "react-router-dom"
import { AuthContext } from '../../helpers/AuthContext';
import "./Login.scss"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {setAuthState} = useContext(AuthContext) 
    let navigate = useNavigate()

    const login = () => {
        const data = {username: username, password: password}
        axios.post("http://localhost:3000/auth/login", data).then( (res) => {
          if(res.data.error) {
            alert(res.data.error)
          }else{
            localStorage.setItem("accessToken", res.data.token)
            setAuthState({
              username: res.data.username,
              id: res.data.id,
              status: true
            })
            navigate("/")
          }
        })
    }

  return (
    <div className='LoginPage'>
        <input type="text" placeholder='Username' onChange={e=>setUsername(e.target.value)}/>
        <input type="password" placeholder='password' onChange={e=>setPassword(e.target.value)}/>
        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login