import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import DeleteIcon from '@mui/icons-material/Delete'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

const Blog = (props) => {
  const blog = props.blog
  if (!blog) {
    return '/'
  }

  let showRemove = false

  if (blog.user.username === props.user.username) {
    showRemove = true
  }

  const clickHandler = (event) => {
    event.preventDefault()
    props.handleLike()
  }

  if (showRemove) {
    return (
      <>
        <Card sx={{ minWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {blog.title[0].toUpperCase()}
              </Avatar>
            }
            title={blog.title}
            subheader={blog.author}
          />
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              url: {blog.url}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Added by: {blog.user.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Likes: {blog.likes}
            </Typography>
            <CardActions disableSpacing>
              <Button
                variant="outlined"
                startIcon={<ThumbUpIcon />}
                onClick={clickHandler}
              >
                Like
              </Button>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={props.handleRemove}
              >
                Delete
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </>
    )
  }

  return (
    <Card sx={{ minWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {blog.title[0].toUpperCase()}
          </Avatar>
        }
        title={blog.title}
        subheader={blog.author}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          url: {blog.url}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Added by: {blog.user.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Likes: {blog.likes}
        </Typography>
        <CardActions disableSpacing>
          <Button
            variant="outlined"
            startIcon={<ThumbUpIcon />}
            onClick={clickHandler}
          >
            Like
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default Blog
