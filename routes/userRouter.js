const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../db')
const uuid = require('uuid')

router.get('/', (req, res,  next) => {
  res.render('auth/home', {
    user: req.user
  })
})
router.get('/login', (req, res,  next) => {
  res.render('auth/login')
})

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/api/user/login' }),
  (req, res,  next) => {
    return res.redirect('/api/user/')
})

router.get('/signup', (req, res,  next) => {
    res.render('auth/signup')
})

router.post('/signup', (req, res,  next) => {
    const user = req.body
    if (!user.name || !user.email || !user.username || !user.password) res.redirect('/api/user/signup')
    const allUsers = db.users.getAllUsers()
    db.users.registerUser({
        id: allUsers[allUsers.length - 1].id + 1,
        username: user.username,
        password: user.password,
        displayName: user.name,
        emails: [{
            value: user.email
        }]
    })
    res.status(200)
    return res.redirect('/api/user/login')
})


router.get('/logout',(req, res,  next) => {
    req.logout(function(err) {
        if (err) { return next(err) }
        res.redirect('/api/user/')
    })
})
router.get('/profile',
    (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/api/user/login')
        }
        next()
    },
    (req, res) => {
        res.render('auth/profile', { user: req.user })
    }
)

module.exports = router