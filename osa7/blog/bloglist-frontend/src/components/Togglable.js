import { useState, useImperativeHandle, forwardRef } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <Grid align="center">
      <div>
        <div style={hideWhenVisible}>
          <Button
            variant="outlined"
            onClick={toggleVisibility}
            startIcon={<ArrowDropDownIcon />}
          >
            Create new
          </Button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <br></br>
          <Button
            variant="outlined"
            onClick={toggleVisibility}
            startIcon={<ArrowDropUpIcon />}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Grid>
  )
})

export default Togglable
