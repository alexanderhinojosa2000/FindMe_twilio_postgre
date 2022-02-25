import React, { useContext } from 'react'
import './Profile.scss'
import { authContext } from '../providers/Authprovider'
import { ListGroup } from 'react-bootstrap'

export default function Profile(props) {
  const { user } = useContext(authContext);
  
  return (
    <div className='profile'>
       <h2>My profile</h2>
      <ListGroup>
        <ListGroup.Item>Name:&nbsp;&nbsp;{user &&  user.firstName} {user &&  user.lastName}</ListGroup.Item>
        <ListGroup.Item>Username:&nbsp;&nbsp;{user &&  user.username}</ListGroup.Item>
        <ListGroup.Item>Phone Number:&nbsp;&nbsp;{user &&  user.phoneNumber} </ListGroup.Item>
        <ListGroup.Item>Email:&nbsp;&nbsp;{user &&  user.email}  </ListGroup.Item>
       
      </ListGroup>    
    </div>
  )
}