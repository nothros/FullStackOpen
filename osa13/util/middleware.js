const jwt = require('jsonwebtoken');
const { User, Blog, Session } = require('../models');
const { SECRET } = require('./config');



const errorHandler = (error, request, res, next) => {
    console.error(error.message);
  
    if (error.name === 'SequelizeValidationError') {
    return res.status(400).send({ error: error.errors[0].message });
      }
    
    next(error.errors[0].message);
  };

  const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
      if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
          console.log(authorization.substring(7))      
          req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch (error){
          console.log(error)
          return res.status(401).json({ error: 'token invalid' })
        }  
      } else {    
        return res.status(401).json({ error: 'token missing' })
      }  
  next()
}

  const getSession = async(req, res, next) => {
    const token = req.token
    const session = await Session.findOne({
      where: {
        token
      }
    })
    if(session){
      req.session = true
    }
    else {
      req.session = false
    }
    next()
  }
  
  module.exports = { errorHandler, getSession, tokenExtractor };