const express = require('express');
const { Blog, User, ReadingList } = require('../models');
const { sequelize } = require('../util/db');
const router = express.Router();

const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

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


router.post('/', async (req, res) => {
    try {
        const user = await User.findByPk(req.user_id)
        const blog = await User.findByPk(req.blog_id)

        const reading_list = await Blog.create({userId: user.id, blogId: blog.id})
        return res.json(reading_list)
      } catch(error) {
        return res.status(400).json({ error })
      }
  })

  router.put('/:id',tokenExtractor, async (req, res) => {
    const readingListitem = await ReadingList.findByPk(req.params.id);
    readingListitem.readed = req.body.read;
    await readingListitem.save();
    res.status(204).json(readingListitem);

  })


module.exports = router;