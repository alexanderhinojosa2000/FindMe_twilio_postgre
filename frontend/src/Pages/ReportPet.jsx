import React, { useContext } from 'react'
// import ProgressBar from '../components/ProgressBar'
import SubmitForm from '../components/SubmitForm'
import { GithubOutlined, YoutubeOutlined, RedditOutlined, TwitterOutlined, InstagramOutlined, FacebookOutlined } from '@ant-design/icons';
import { authContext } from '../providers/Authprovider'
import { Navigate } from 'react-router-dom'

import { Layout } from 'antd'

import './ReportPet.scss'
import Slider from '@ant-design/react-slick';

const { Header, Footer, Sider, Content } = Layout;

export default function ReportPet() {
  const { auth } = useContext(authContext);
  if (auth) {
    return (
      <Layout>
        <Layout>
          <Content id="content">
            <h1>Report Missing Cat</h1>
            <SubmitForm />
          </Content>
        </Layout>
        {/* <Footer id="footer">Footer</Footer> */}
      </Layout>
    )
  } else {
    return <Navigate to="/login" />
  }
}


