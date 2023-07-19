const express = require('express');
const router = express();
const { createCMSUser } = require('./controller');

// const {
//   authenticateUser,
//   authorizeRoles,
// } = require('../../../middlewares/auth');

router.post('/users', createCMSUser);

module.exports = router;
