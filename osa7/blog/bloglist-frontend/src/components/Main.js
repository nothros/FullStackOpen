import UserList from './Users'
import React from 'react'
import { useDispatch } from 'react-redux'
import Blog from './Blog'
import { logout } from '../reducers/loginReducer'
import { useSelector } from 'react-redux'
import { removeBlog, addLike } from '../reducers/blogReducer'
import { Routes, Route, Link, useMatch, Navigate } from 'react-router-dom'
import Bloglist from './Blogs'
import User from './User'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Main = () => {
  const users = useSelector((state) => state.users)
  const match = useMatch('/users/:id')
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const usera = match ? users.find((user) => user.id === match.params.id) : null

  const matchblog = useMatch('/blogs/:id')
  const bloga = matchblog
    ? blogs.find((blog) => blog.id === matchblog.params.id)
    : null
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(logout())
  }

  const handleLike = (blog) => {
    blog.likes++
    console.log(blog)
    dispatch(addLike(blog))
  }

  const handleRemove = (blog) => {
    if (
      window.confirm('remove blog ' + blog.title + ' by ' + blog.author + '?')
    ) {
      dispatch(removeBlog(blog.id))
    }
  }

  return (
    <>
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Button>
                <Link to="/">blogs</Link>
              </Button>
              <Button>
                <Link to="/users">users</Link>
              </Button>
              <Typography
                variant="h6"
                component="div"
                align="right"
                sx={{ flexGrow: 1 }}
              >
                Logged in as {user.name}
              </Typography>
              <Button color="inherit" onClick={handleLogout} type="submit">
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </>
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            bloga ? (
              <Blog
                blog={bloga}
                user={user}
                handleRemove={() => handleRemove(bloga)}
                handleLike={() => handleLike(bloga)}
              />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User user={usera} />} />
        <Route path="/" element={<Bloglist blogs={blogs} user={user} />} />
      </Routes>
    </>
  )
}

export default Main
