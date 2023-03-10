const express = require('express');
const router = express.Router();
const { Blog, User } = require('../models')
const { Op } = require("sequelize");
const { getSession, tokenExtractor } = require('../util/middleware');



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

router.post('/', tokenExtractor,getSession, async (req, res) => {
  
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({...req.body, userId: user.id})
        const session = req.session;

        if (!session) {
          return res.status(401).json({ error: 'Session expired' });
        }

        return res.json(blog)
      } catch(error) {
        return res.status(400).json({ error })
      }
  })

  router.delete('/:id', tokenExtractor, getSession, async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    const user = await User.findByPk(req.decodedToken.id)
    const session = req.session;

    if (!session) {
      return res.status(401).json({ error: 'Session expired' });
    }

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