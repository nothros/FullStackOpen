const router = require('express').Router()
const { Blog } = require('../models')

router.get('/', async (req,res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.post('/', async (req, res) => {
    try{
        console.log(req.body)
        const note = await Blog.create(req.body)
        res.json(note)
    } catch(error) {
        return res.status(400).json({ error })
    }
  })

  router.delete('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      console.log(JSON.stringify(blog))
      await blog.destroy()
    } else {
        res.status(204).end()
        }
})

router.put('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
        blog.likes = req.body.likes
        await blog.save()
        res.json(blog)
    } else {
        res.status(404).end()
    }
  })

module.exports = router