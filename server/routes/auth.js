const express = require('express')
const User = require('../models/User')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
require('dotenv').config()


// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
  const { username, password } = req.body
  // validation
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing data' })
  }
  try {
    // check for existing user
    const user = await User.findOne({
      userName: username
    })

    if (user) {
      return res.status(400).json({ success: false, message: 'User name is already' })
    }

    // pass
    // const hashedPassword = await argon2.hash(password)
    const newUser = new User({
      userName: username,
      password,
    })
    await newUser.save()

    // return token
    const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACESS_TOKEN)
    res.json({ success: true, message: 'Register succesfully', accessToken })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal Server' })
  }
})

// @route POST api/auth/login
// @desc login user
// @access Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  // validation
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing data' })
  }
  try {
    // check for existing user
    const user = await User.findOne({
      userName: username
    })

    if (!user) {
      return res.status(400).json({ success: false, message: 'Wrong data' })
    }

    // username found
    // const hashedPassword = await argon2.hash(password)
    if (password !== user.password) {

      return res.status(400).json({ success: false, message: 'Wrong data' })
    }

    // All good
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACESS_TOKEN)

    res.json({ success: true, message: 'Login succesfully', username, accessToken })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Interval error' })
  }
})

module.exports = router