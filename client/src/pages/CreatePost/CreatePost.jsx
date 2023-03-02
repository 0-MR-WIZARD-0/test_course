import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './CreatePost.scss'

const CreatePost = () => {

    const initialValues = {
        title: "",
        postText: "",
    }

    useEffect(()=>{
        if(!localStorage.getItem("accessToken")){
            navigate("/login")
        }    
    },[])

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required()
    })
    
    let navigate = useNavigate()

    const onSubmit = (data) => {
        axios.post("http://localhost:3000/posts", data, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }})
        .then(() => navigate("/"))
    }

  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
                <ErrorMessage name="title" component="span"/>
                <Field id="inputCreatePost"
                       name="title"
                       placeholder="Title"/>
                <ErrorMessage name="postText" component="span"/>
                <Field id="inputCreatePost"
                       name="postText"
                       placeholder="Text"/>
                <button type="submit">Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost