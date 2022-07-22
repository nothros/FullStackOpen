import { useState } from 'react'
import React from 'react'

const Blog = (props) => {
  const blog = props.blog
  const [visible, setVisible] = useState(false)

  let showRemove = false

  if (blog.user.username === props.user.username) {
    showRemove = true
  }

  const clickHandler = (event) => {
    event.preventDefault()
    props.handleLike()
  }


  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const buttonLabel = visible ? 'hide' : 'view'
 
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (showRemove) {
    return (
      <><div style={blogStyle}>
          <p>{blog.title} {blog.author} <button onClick={toggleVisibility} id='view-button'>{buttonLabel}</button></p>
        <div style={showWhenVisible}>
            <div>{blog.url} </div>
            <div id='like'>likes: {blog.likes} <button id='like-button' onClick={clickHandler} >like</button> </div>
            <div>Added by: {blog.user.name}</div>
            <button onClick={props.handleRemove} id='remove-button' style={showWhenVisible}>remove</button>
                    </div>
          </div></>)

  }

return (
  <div style={blogStyle} className="hiddenBlogContents">
    <div>
      {blog.title} {blog.author} <button id="viewBlogButton" onClick={toggleVisibility}>view</button>
      <div style={showWhenVisible}>
      <div>{blog.url} </div>
            <div id='like'>likes: {blog.likes} <button id='like-button' onClick={clickHandler} >like</button> </div>
            <div>Added by: {blog.user.name}</div>
            </div>
    </div>
  </div>
)
}

export default Blog
