import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const BlogForm = ({ blogs, setBlogs, setNotification, setNotificationType }) => {
  const [blogtitle, setBlogTitle] = useState('')
  const [author, setBlogAuthor] = useState('')
  const [url, setBlogUrl] = useState('')
  const noteFormRef = useRef()

  const handleNewBlog = (event) => {
    event.preventDefault()
    const blog = {
      'author': author,
      'title': blogtitle,
      'url': url
    }
    noteFormRef.current.toggleVisibility()
    blogService
    .create(blog)
      .then(response => {
        setBlogAuthor('')
        setBlogTitle('')
        setBlogUrl('')
        setBlogs(blogs.concat(response))
        setNotification('a new blog ' + blog.title + ' by ' + blog.author + " added")
        setNotificationType('info')
      })
      setTimeout(() => {
        setNotification(null)
      }, 2000)
  }

  return (
        <Togglable buttonLabel="new blog"  ref={noteFormRef}>
      <div><h2>Create new</h2><form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            id='title'
            type="text"
            value={blogtitle}
            name="title"
            onChange={({ target }) => setBlogTitle(target.value)} />
        </div>
        <div>
          author:
          <input
            id='author'
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setBlogAuthor(target.value)} />
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setBlogUrl(target.value)} />
        </div>
  
        <button type="submit" id='create-button'>create</button>
      </form>  
      </div>
      </Togglable>
      )
}

BlogForm.propTypes = {
    blogs: PropTypes.array.isRequired,
    setBlogs: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    setNotificationType: PropTypes.func.isRequired
  }


export default BlogForm


