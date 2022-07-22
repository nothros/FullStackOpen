import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import { red } from '@mui/material/colors'
import Table from '@mui/material/Table'
import ListItemText from '@mui/material/ListItemText'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'

const UserList = () => {
  const users = useSelector((state) => state.users)
  return (
    <>
      <TableContainer component={Paper} align="center">
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell align="right">Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <ListItem
                    component={Link}
                    to={`/users/${user.id}`}
                    variant="outlined"
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {user.name[0].toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                  </ListItem>
                </TableCell>
                <TableCell align="right">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default UserList
