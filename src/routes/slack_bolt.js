const express = require('express');
const router = express.Router();

const SlackBoltController = require('../controllers/slack_bolt');

router.get('/', SlackBoltController.init);

module.exports = router;