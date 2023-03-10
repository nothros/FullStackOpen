const express = require('express');
const router = express.Router();
const { Session } = require('../models')


router.delete('/', async (req, res) => {
    console.log(req.body.userId)
    const user = await Session.findOne({ where: { userId: req.body.userId } });

    console.log(user)
    await user.destroy();
    res.status(204).json({message: 'Session removed'});
})

module.exports = router;