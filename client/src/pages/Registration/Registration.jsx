import axios from 'axios'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import "./Registration.scss"

const Registration = () => {

    let navigate = useNavigate()

    const initialValues = {
        username: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required()
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3000/auth", data).then(() => 
            navigate("/login")
        )
    }

  return (
    <div className='RegistrationPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
                <Field id="inputCreateUser"
                       name="username"
                       placeholder="Username"/>
                <ErrorMessage name="username" component="span"/>
                <Field id="inputCreateUser"
                       name="password"
                       type="password"
                       placeholder="Password"/>
                <ErrorMessage name="password" component="span"/>
            <button type="submit">Register</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Registration