import { useState } from 'react'
import React from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';





const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <><Card sx={{ minWidth: 275 }}>
          <CardContent>
              <Typography variant="h5" component="div">
              <h2>{user.name}</h2>
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Added blogs
              </Typography>
              <Typography variant="body2">
              <ul>
                  {user.blogs.map((blog) => (
                      <li key={blog.id}>{blog.title}</li>
                  ))}
              </ul>
              </Typography>
          </CardContent>

      </Card></>
  )
}

export default User
