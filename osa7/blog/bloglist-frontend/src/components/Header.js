import React, { useState }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from "react-router-dom"
  import { logout } from '../reducers/loginReducer'
import Main from './Main'
import UserList from './Users'
import User from "./User";


  
  const Header = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
  


    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.clear()
        dispatch(logout())
      };
    

  
    const padding = {
      padding: 5
    }
  
    return (
        <Router>
        <div>
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
          Logged in as {user.name}
          <button variant="danger" onClick={handleLogout} type="submit">
            logout
          </button>
        </div>

        <Routes>
        <Route path='/users/:id' element={<User users={user} />}/>

          <Route path="/" element={<Main />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </Router>
    )
  }

  export default Header;
