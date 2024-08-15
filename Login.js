import React,{useState,useEffect} from 'react'
import {Form,Input,message} from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/layout/Spinner';
const Login = () => {
    const[loading,setloading]=useState(false)
    const navigate=useNavigate()
    const submitHandler=async(values)=>{
        try {
            setloading(true)
            const {data}=await axios.post('/users/login',values)
            setloading(false)
            message.success('login success')
            localStorage.setItem('user',JSON.stringify({...data.user,password:''}))
            navigate('/')
        } catch (error) {
            setloading(false)
            message.error("something went wrong")
        }
    };

    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/')
        }
    },[navigate]);
  return (
    <>
    <div className="register-page">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
            <h1>Login form</h1>

            <Form.Item label="Email" name="email">
                <Input type="email"/>
            </Form.Item>

            <Form.Item label="password" name="password">
                <Input type="password"/>
            </Form.Item>

            <div className="d-flex justify-content-between">
                <Link to="/register">Not a user? Click Here to Register</Link>
                <button className="btn btn-primary">login</button>
            </div>
        </Form>
    </div>
    </>
  )
}

export default Login