import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './ChangePassword.scss'

const ChangePassword = () => {

  let navigate = useNavigate()

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
  
    const changePassword = () => {
      axios
        .put(
          "http://localhost:3000/auth/changepassword",
          {
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.error) {
            alert(response.data.error);
          }
          navigate("/")
        });

    };

  return (
    <div className='changePasswordPage'>
        <input type="password" placeholder='Old password' onChange={(e)=>setOldPassword(e.target.value)}></input>
        <input type="password" placeholder='New password' onChange={(e)=>setNewPassword(e.target.value)}></input>
        <button onClick={changePassword}>Save changes</button>
    </div>
  )
}

export default ChangePassword