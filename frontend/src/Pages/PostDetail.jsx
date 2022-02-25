import React from 'react'
import CatFormDetails from '../components/CatFormDetails'
import CommentSection from '../components/CommentSection'
import PostItem from '../components/PostItem'
import Map from '../components/Map'

import './PostDetail.scss'

export default function PostDetail() {
 
  return (
    <>
    <div className='detailsPage'>
      <div className='detailsTitle'>
        <h1>Cat Details</h1>
      </div>
      <div className='postDetail'>
        <CatFormDetails/>
      </div>
      <div id='commentArea'>
        <CommentSection />
      </div>
    </div>
    </>
  )
}