import { useState } from 'react'
import React from 'react'
import blogService from '../services/blogs'

const Blog = (props) => {
  const blog = props.blog
  const adder = blog.user
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const buttonLabel = visible ? 'hide' : 'view'

  const handleRemove = () => {
    if (window.confirm('remove blog ' + blog.title + ' by ' + blog.author + '?')) {
      blogService
        .remove(blog.id)  
        .then((response) => {
          console.log('response', response)
        })
        .then(() => {
          blogService.getAll().then(blogs =>
            props.setBlogs(blogs)
          )
          props.setNotification('poistaminen onnistui')
          props.setNotificationType('info')
          setTimeout(() => {
            props.setNotification(null)
          }, 2000)
        })
        .catch(() => {
          props.setNotification('blogin poistaminen epäonnistui')
          props.setNotificationType('error')
          setTimeout(() => {
            props.setNotification(null)
          }, 2000)
        })
    }
  }
 
  const handleLike = () => {
    blog.likes++
    blogService
      .update(blog)
      .then((response) => {
        console.log('response', response)
      })
      .then(() => {
        blogService.getAll().then(blogs =>
          props.setBlogs(blogs)
        )
        props.setNotification('Like added')
        props.setNotificationType('info')
        setTimeout(() => {
          props.setNotification(null)
        }, 2000)
      })
      .catch(() => {
        props.setNotification('Like failed')
        props.setNotificationType('error')
        setTimeout(() => {
          props.setNotification(null)
        }, 2000)
      })
  }
  const showForOwner = { display: (adder.name === props.user.name) ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
  <><div style={blogStyle}>
      <p>{blog.title} {blog.author} <button onClick={toggleVisibility} id='view-button'>{buttonLabel}</button></p>
    <div style={showWhenVisible}>
        <div>{blog.url} </div>
        <div id='like'>likes: {blog.likes} <button id='like-button' onClick={handleLike} >like</button> </div>
        <div>Added by: {blog.user.name}</div>
        <button onClick={handleRemove} id='remove-button' style={showForOwner}>remove</button>
                </div>
      </div></>
)}

export default Blog