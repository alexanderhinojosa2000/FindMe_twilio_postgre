import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Menu, Dropdown, Button } from 'antd'
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faCalendar, faVenus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Loading from "./Loading";


export default function Post() {
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
    <div className="card mb-3" style={{ width: '1000px' }}>
      <h1>This is Post detail component</h1>
      <div className="row no-gutters">
        <div className="col-md-4">
          <Card hoverable>

            <img src={post.image} alt=""
              style={{ width: '100%', height: '250px' }} />

            <text x="50%" y="50%" fill="#dee2e6" dy=".3em">

            </text>
          </Card>

        </div>
        <div className="col-md-8">

          <div className="card-body">
            <h5 className="card-title">{post.name}</h5>
            <p className="card-text">{post.age}&nbsp;months old</p>
            {post.gender === 'male' ? <p className="card-text"><FontAwesomeIcon icon={faMars} />&nbsp;{post.gender}</p> :
              <p className="card-text"><FontAwesomeIcon icon={faVenus} />&nbsp;{post.gender}</p>}

            <p className="card-text" title={post.last_seen_date}>
              <FontAwesomeIcon icon={faCalendar} />&nbsp;Last Seen:&nbsp;
              {new Intl.DateTimeFormat('en-GB', {
                month: 'long',
                day: '2-digit',
                year: 'numeric',
              }).format(new Date(post.last_seen_date))}</p>
            <p className="card-text">
              <small className="text-muted">{post.description}</small>
            </p>
          </div>
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <Button>Contact</Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}