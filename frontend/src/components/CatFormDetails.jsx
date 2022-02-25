import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Loading from "./Loading";
import { Row, Col, Menu, Dropdown, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMapMarker, faVenus, faMars, faCalendar} from '@fortawesome/free-solid-svg-icons';
import Map from '../components/Map';


import './CatForms.scss'


export default function CatFormDetails() {

  const [post, setPost] = useState(null);
  const { id } = useParams();

  const menu = (
    <Menu>
      <Menu.Item>
        Username:&nbsp;&nbsp; {post && post.username}
      </Menu.Item>
      <Menu.Item>
        Phone Number:&nbsp;&nbsp;{post && post.phone_number}
      </Menu.Item>
      <Menu.Item>
        Email:&nbsp;&nbsp;
        <a target="_blank" rel="noopener noreferrer" href={`mailto:${post && post.email}`}>
          {post && post.email}
        </a>
      </Menu.Item>
    </Menu>
  );


  useEffect(() => {
    axios.get(`http://localhost:3001/api/catforms/${id}`)
      .then(res => {
        const postData = res.data;
        setPost(postData);
      })
      .catch(err => {
        console.log(err)
      })
  }, [id]);

  if (!post) {
    return <Loading />
  }
  return (
    <>
    
      <div className='box'> 
        <img src={post.image} alt='users cat'/>
      </div>
      <div id='overThis'>
        <div className='boxDetails'>
        < Row>
            <Col className='ant-col-18' span={18} push={6}>
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <Button style={{width: '50%'}}>Contact</Button>
          </Dropdown>
             
            </Col>
             <Col className='ant-col-6' span={8} pull={18}>
              Contact Info:
            </Col>
          </Row>
        < Row>
            <Col className='ant-col-18' span={18} push={6}>
              {post.cat_name}
            </Col>
             <Col className='ant-col-6' span={6} pull={18}>
              Name:
            </Col>
          </Row>
          < Row>
            <Col className='ant-col-18' span={18} push={6}>
              {post.status}
            </Col>
             <Col className='ant-col-6' span={6} pull={18}>
              Status:
            </Col>
          </Row>
          < Row>
            <Col className='ant-col-18' span={18} push={6}>
            {post.gender === 'male' ? <div><FontAwesomeIcon icon={faMars}/>&nbsp;{post.gender}</div> : 
            <div><FontAwesomeIcon icon={faVenus}/>&nbsp;{post.gender}</div>}
            </Col>
             <Col className='ant-col-6' span={6} pull={18}>
              Sex:
            </Col>
          </Row>
          < Row>
            <Col className='ant-col-18' span={18} push={6}>
              {post.description}
            </Col>
             <Col className='ant-col-6' span={6} pull={18}>
              Description:
            </Col>
          </Row>
          < Row>
            <Col className='ant-col-18' span={18} push={6}>
            <FontAwesomeIcon icon={faCalendar}/>&nbsp;
            {new Intl.DateTimeFormat('en-GB', { 
                month: 'long', 
                day: '2-digit',
                year: 'numeric', 
            }).format(new Date(post.last_seen_date))}
            </Col>
             <Col className='ant-col-6' span={6} pull={18}>
              Date Last Seen:
            </Col>
          </Row>
          < Row>
            <Col className='ant-col-18' span={18} push={6}> 
            <FontAwesomeIcon icon={faMapMarker} />&nbsp;&nbsp; 
              {post.last_seen_city} , {post.last_seen_postal_code}
            </Col>
             <Col className='ant-col-6' span={6} pull={18}>
              Area Last Seen:
            </Col>
          </Row>
          < Row>
            <Col className='ant-col-18' span={18} push={6}>
              
              <Map />
            
            </Col>
             <Col className='ant-col-6' span={6} pull={18}>
              Address Last Seen:
            </Col>
          </Row>
        </div>
      </div> 
      
    
    </>
  
  )
}
