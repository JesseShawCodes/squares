const express = require('express');
const router = express.Router();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var User =  require('../models/user');


module.exports = router; 