const express = require('express')
const indexRouter = require('./routes/indexRouter')
const errorMiddleware = require('./middlewares/errorMiddleware')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('./db')

const verify = (username, password, done) => {
  db.users.findByUsername(username, (err, user) => {
    if (err) { return done(err) }
    if (!user) { return done(null, false) }

    if (!db.users.verifyPassword(user, password)) {
      return done(null, false)
    }
    return done(null, user)
  })
}

const options = {
  usernameField: 'username',
  passwordField: 'password'
}

passport.use('local', new LocalStrategy(options, verify))

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  db.users.findById(id, (err, user) => {
    if (err) { return cb(err) }
    cb(null, user)
  })
})

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.set('view engine', 'ejs')

app.use(session({ secret: 'SECRET' }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/public', express.static(__dirname + '/public'))
app.use('/api', indexRouter)
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Главная',
  })
})

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server started on ${ PORT } port!`))