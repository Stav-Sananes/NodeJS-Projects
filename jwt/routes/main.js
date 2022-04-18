const express = require('express');

const router = express.Router();
const authMiddleWare = require('../middleware/auth');

const { login, dashboard } = require('../controllers/main');
router.route('/dashboard').get(authMiddleWare, dashboard);
router.route('/login').post(login);

module.exports = router;
