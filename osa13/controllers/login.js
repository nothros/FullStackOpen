const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const { SECRET } = require('../util/config')
const User = require('../models/user')
const Session = require('../models/session')

router.post('/', async (req, res) => {
  console.log(req.body.username)
    const u =req.body
    const user = await User.findOne({ where: { username: u.username } });

    if (user.disabled) {
      return res.status(401).json({ error: 'Account is disabled' });
    }
  
    if (!user) {
      return res.json(400).json({ error: 'Invalid username' });
    }
  
    const passwordCorrect = req.body.password === 'salainen'

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  console.log(token)
  await Session.create({
    token,
    userId: user.id,
  });

  res.status(200).json({ token, username: user.username, name: user.name });
})


module.exports = router