
import CarouselTest from '../components/Carousel'
import React, { useContext } from 'react'
import LoginForm from '../components/LoginForm'
import './Login.scss'
import { authContext } from '../providers/Authprovider'
import { Navigate } from 'react-router-dom'


export default function Login() {
  const { auth, user } = useContext(authContext);

  if (auth && user) {
  return <Navigate to={`/mypage/${user.id}`}  />
  }
  return (
    <div id='login'>
     
      <div id="Left" >
      <h1>Welcome Back! We've missed you!</h1>
      <LoginForm />
      </div>
      <div id="Right">
      <CarouselTest/>
      </div>
    </div>
  )
}