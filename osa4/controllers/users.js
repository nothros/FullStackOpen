const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  
  const { username, name, password } = request.body
  console.log(username)
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })  
  }

  if (password.lenght < 3){
    return response.status(400).json({
      error: 'password must exist or be longer than 3'
    })
  }
  

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User    
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter