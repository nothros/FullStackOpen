import { useState, useRef } from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/blogReducer'
import { setNotification } from '../reducers/NotificationReducer'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const BlogForm = ({ blogs, user }) => {
  const dispatch = useDispatch()

  const [blogtitle, setBlogTitle] = useState('')
  const [author, setBlogAuthor] = useState('')
  const [url, setBlogUrl] = useState('')
  const noteFormRef = useRef()

  const handleNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      author: author,
      title: blogtitle,
      url: url
    }
    noteFormRef.current.toggleVisibility()
    console.log(user.user + 'TÄÄLLÄ 2')
    dispatch(createNew(newBlog, user))

    dispatch(
      setNotification(
        'a new blog ' + newBlog.title + ' by ' + newBlog.author + ' added'
      )
    )
  }

  return (
    <>
      <Typography variant="h6" gutterBottom marginTop={2} align="center">
        Create new blog
      </Typography>
      <Togglable buttonLabel="new blog" ref={noteFormRef}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="blogtitle"
              name="blogtitle"
              label="Blog title"
              value={blogtitle}
              onChange={({ target }) => setBlogTitle(target.value)}
              fullWidth
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="author"
              label="Author"
              value={author}
              name="author"
              onChange={({ target }) => setBlogAuthor(target.value)}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="url "
              label="Url"
              value={url}
              name="url"
              onChange={({ target }) => setBlogUrl(target.value)}
              fullWidth
              variant="standard"
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          onClick={handleNewBlog}
          sx={{ mt: 3, ml: 1 }}
        >
          {'Add Blog'}
        </Button>
      </Togglable>
    </>
  )
}

BlogForm.propTypes = {
  //  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
  //  setNotificationType: PropTypes.func.isRequired,
}

export default BlogForm
