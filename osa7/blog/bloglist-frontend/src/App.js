import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'
import Main from './components/Main'
import RealHeader from './components/RealHeader'
import { Container } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { green } from '@mui/material/colors'

const App = () => {
  const theme = createTheme({
    palette: {
      primary: green,
    }
  })

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <>
          <RealHeader />
          <Notification />
          {user === null || undefined ? <LoginForm /> : <Main />}
        </>
      </Container>
    </ThemeProvider>
  )
}

export default App
