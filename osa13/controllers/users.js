const router = require('express').Router()

const { User, Blog, ReadingList } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: { model: Blog, attributes: { exclude: ['userId'] } },
})
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  let where = {};

  if (req.query) {
    where = { ...req.query };
  }

  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      as: 'readings',
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
      through: {
        attributes: ['id', 'readed'],
        where,
      },
    },
  });

  if (!user) {
    return res.status(404).json({ message: 'No user found' });
  }

  res.status(200).json(user);
})

router.put('/:username', async (req, res) => {
    await User.update(
      { name: req.body.name },
      {
        where: {
          username: req.params.username,
        },
      }
    );
    res.status(204);
  });

module.exports = router