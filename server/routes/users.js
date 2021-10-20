const express = require('express');
const router = express.Router();

const { usersController } = require('../controllers');

router.post('/signup', usersController.signup.post);
router.get('/:email/check', usersController.emailCheck.get);
router.post('/login', usersController.login.post);
router.post('/logout', usersController.logout.post);
