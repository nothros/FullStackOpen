import React from 'react'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import { red } from '@mui/material/colors'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const Bloglist = ({ blogs, user }) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <>
      <BlogForm blogs={blogs} user={user} />
      <TableContainer component={Paper} align="center">
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Blogs</TableCell>
              <TableCell align="right">Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.sort(byLikes).map((blog) => (
              <TableRow
                key={blog.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <ListItem
                    component={Link}
                    to={`/blogs/${blog.id}`}
                    variant="outlined"
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {blog.title[0].toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={blog.title}
                      secondary={blog.author}
                    />
                  </ListItem>
                </TableCell>
                <TableCell align="right">{blog.likes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Bloglist
