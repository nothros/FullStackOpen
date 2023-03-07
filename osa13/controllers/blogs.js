const express = require('express');
const router = express.Router();
const { Blog } = require('../models')

router.get('/', async (req,res) => {
    const blogs = await Blog.findAll()
    res.status(200).json(blogs);
    
})

router.post('/', async (req, res) => {
        console.log(req.body)
        const newBlog = await Blog.create(req.body)
        res.status(201).json(newBlog);
  })

  router.delete('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) {
        return res.status(404).json({ error: 'Blog does not exist' });
      }
    
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