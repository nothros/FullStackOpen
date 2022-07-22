import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')    
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('info')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      setBlogs( blogs )
    }
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault() 
    try{
      const user = await loginService.login({
        username, password
      })
    
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      console.log(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification('Welcome ' + user.name)
      setNotificationType('info')

    } catch(expection) {
      setNotification('wrong credentials')
      setNotificationType('error')
      console.log(notification)
      
    }
    setTimeout(() => {
      setNotification(null)
    }, 2000)

    }
  
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleLike = (blog) => {
    blog.likes++
    blogService
      .update(blog)
      .then((response) => {
        console.log('response', response)
      })
      .then(() => {
        blogService.getAll().then(blogs =>
          setBlogs(blogs)
        )
        setNotification('Like added')
        setNotificationType('info')
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      })
      .catch(() => {
        setNotification('Like failed')
        setNotificationType('error')
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      })
  }

  const handleRemove = (blog) => {
    if (window.confirm('remove blog ' + blog.title + ' by ' + blog.author + '?')) {
      blogService
        .remove(blog.id)  
        .then((response) => {
          console.log('response', response)
        })
        .then(() => {
          blogService.getAll().then(blogs =>
            setBlogs(blogs)
          )
          setNotification('removed')
          setNotificationType('info')
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
        .catch(() => {
          setNotification('removed failed')
          setNotificationType('error')
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
    }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
        <h2>blogs</h2>
        <Notification message={notification} type={notificationType} />
        {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          setPassword={setPassword}
          password={password}
        /> :
        <div>
          <p>{user.name} logged in<button onClick={handleLogout} type="submit">logout</button></p>
          <div>
            <h2>blogs</h2>
            <BlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              setNotification={setNotification}
              setNotificationType={setNotificationType}
            />

            {blogs.sort(byLikes).map(blog => 
              <Blog key={blog.id} blog={blog} user={user} 
              handleRemove={() => handleRemove(blog.id)} 
              handleLike={() => handleLike(blog)} />           
            )}
          </div>
      </div>
      }
          
    </div>
  )
}

export default App