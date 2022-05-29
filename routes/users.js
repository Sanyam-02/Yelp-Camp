const express = require('express');
const Logger = require('nodemon/lib/utils/log');
const passport = require('passport');
const users = require('../controllers/user');
const router = express.Router();
const catchAsync = require('../utlis/catchAsync');

router.get('/register' ,users.renderRegister);

router.post('/register',catchAsync(users.register))

router.get('/login' ,users.renderLogin)

router.post('/login',passport.authenticate('local',{failureFlash: true, failureRedirect: '/login'}) ,users.login)

router.get('/logout', users.logout);

module.exports = router;