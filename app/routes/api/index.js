const express = require('express');
const reminderRoutes = require('./reminders');

const router = new express.Router();
router.use(reminderRoutes);

module.exports = router;
