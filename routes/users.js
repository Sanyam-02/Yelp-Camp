const express = require('express');
const Logger = require('nodemon/lib/utils/log');
const passport = require('passport');
const users = require('../controllers/user');
const router = express.Router();
const catchAsync = require('../utlis/catchAsync');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local',{failureFlash: true, failureRedirect: '/login'}) ,users.login)

router.get('/logout', users.logout);

module.exports = router;