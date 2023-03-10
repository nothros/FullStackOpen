const express = require('express');
const { Blog, User, ReadingList } = require('../models');
const { sequelize } = require('../util/db');
const { getSession, tokenExtractor } = require('../util/middleware');
const router = express.Router();



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

  router.put('/:id',tokenExtractor,getSession, async (req, res) => {
    const session = req.session;
    const user = await User.findByPk(req.user_id)


    if (!session) {
        return res.status(401).json({ error: 'Session expired' });
      }
      if (!user.id === readingListitem.userId) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        
    const readingListitem = await ReadingList.findByPk(req.params.id);
    readingListitem.readed = req.body.read;
    await readingListitem.save();
    res.status(204).json(readingListitem);

  })


module.exports = router;