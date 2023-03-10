const express = require('express');
const router = express.Router();
const { Session } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async (req, res) => {
    await Session.destroy({
      where: {
        userId: req.user.id
      }
    })
  
    res.status(200).send({
      message: 'token revoken'
    })
  })

module.exports = router;