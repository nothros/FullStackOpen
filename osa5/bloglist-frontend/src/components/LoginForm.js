import React from "react"


const LoginForm = (props) => {
    return (
        <><h2>Login</h2>
        <form onSubmit={props.handleLogin}>
            <div>
                username <input type="text" id='username' value={props.username} name="Username" onChange={({ target }) => props.setUsername(target.value)} />
            </div>
            <div>
                password <input type="password" id='password' value={props.password} name="Password" onChange={({ target }) => props.setPassword(target.value)} />
            </div>
            <button type="submit" id='login-button'>login</button>
        </form></>
      )
 }
 
 export default LoginForm