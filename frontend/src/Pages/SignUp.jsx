import React from 'react'
import CarouselTest from '../components/Carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'

import SignupForm from '../components/SignupForm'
import './SignUp.scss'


export default function SignUP() {
  return (
    <div id="box">
       <div id="LCard" >
      <h1>Register & Join Our Community Today!<FontAwesomeIcon icon={faPaw}/></h1>
        <SignupForm />
       </div>
       <div id="RCard">
        <CarouselTest/>
       </div>
    </div>
  )
}
