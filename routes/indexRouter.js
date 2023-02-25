const express = require('express')
const bookRouter = require('./bookRouter')
const userRouter = require('./userRouter')
const router = express.Router()

router.use('/books', bookRouter)
router.use('/user', userRouter)

module.exports = router