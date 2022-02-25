import { Avatar, Button, Comment, Form, Input, List, Tooltip } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams, Link } from 'react-router-dom'
import { authContext } from '../providers/Authprovider'

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    // header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value, onFinish }) => (
  <>
    <Form.Item>
      <TextArea rows={5} onChange={onChange} value={value} showCount maxLength={250} style={{ width: '100%' }} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [refreshComments, setRefreshComments] = useState(true)
  const { user } = useContext(authContext);
  const { id } = useParams();


  useEffect(() => {
    const url = `http://localhost:3001/api/comment/${id}`
    if (refreshComments) {
      // Fetch the comments and set the comments into the components state
      axios.get(url)
        .then(response => {
          const newComments = []
          for (let i = 0; i < response.data.length; i++) {
            newComments.push({
              actions: [<span key="comment-list-reply-to-0">Reply to</span>],
              author: response.data[i].username,
              avatar: 'https://joeschmoe.io/api/v1/random',
              content: response.data[i].comment,
              datetime: (
                <Tooltip title={moment(response.data[i].date_created).format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{moment(response.data[i].date_created).fromNow()}</span>
                </Tooltip>
              )
            })
          }
          setComments(newComments)
        })
        .catch(error => {
          console.log(error)
        })
      setRefreshComments(false);
    }
  }, [refreshComments, id])

  const handleSubmit = () => {
    const url = "http://localhost:3001/api/comment"
    const payload = {
      comment: value,
      cat_form_id: id,
      user_id: user.id,
    }

    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setComments([
        ...comments,
        {
          // Change to pull info from DB username/ we dont have a avatar column {
          actions: [<span key="comment-list-reply-to-0">Reply to</span>],
          author: user.username,
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
        },
      ])
      setValue('');
    }, 1000);

    axios.post(url, payload)
      .then(res => {
        setRefreshComments(true)
      })
      .catch(err => { console.log(err) })
      .finally(() => {
        setSubmitting(false);
      })
  }

  const handleChange = e => {
    setValue(e.target.value);
  };

  if (!user) {
    return (
      <>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Link to="/login">
          <Button type="primary">Login to comment</Button>
        </Link>
      </>
    )
  }

  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}

          />
        }
      />
    </>
  );


}


export default CommentSection;