const express = require('express');
const router = express.Router();
const { Blog, User } = require('../models')
const { Op } = require("sequelize");


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



router.get('/', async (req,res) => {
  let where = {};

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
      ],
    };
  }

    const blogs = await Blog.findAll({
      include: [
        {
          model: User,
        },
      ],
      attributes: { exclude: ['userId'] },
      where,
      order: [['likes', 'DESC']],
    });
    res.status(200).json(blogs);
    
})

router.post('/', tokenExtractor, async (req, res) => {
  
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({...req.body, userId: user.id})
        return res.json(blog)
      } catch(error) {
        return res.status(400).json({ error })
      }
  })

  router.delete('/:id', tokenExtractor, async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    const user = await User.findByPk(req.decodedToken.id)

    console.log(user)
    if (!blog) {
        return res.status(404).json({ error: 'Blog does not exist' });
    }

    if (blog.userId !== user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
      await blog.destroy();
      res.status(204).end();
})

router.put('/:id', async (req, res) => {
    const likedBlog = await Blog.findByPk(req.params.id);
    if (!likedBlog) {
        console.log("JEE")
      return res.status(404).json({ error: 'Blog does not exist' });
    }
  
    likedBlog.likes = likedBlog.likes + 1;
    await likedBlog.save();
    res.status(204).json({ likes: likedBlog.likes });
  })

module.exports = router