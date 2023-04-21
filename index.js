const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const indexRouter = require('./routes/indexRouter')
const errorMiddleware = require('./middlewares/errorMiddleware')
const session = require('express-session')

const app = express()
const server = http.Server(app)
const io = socketIO(server)

app.use(express.json())
app.use(express.urlencoded())
app.set('view engine', 'ejs')

app.use(session({ secret: 'SECRET' }))

app.use('/public', express.static(__dirname + '/public'))
app.use('/api', indexRouter)
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Главная',
  })
})

io.on('connection', socket => {
  const { id } = socket
  const { roomName } = socket.handshake.query

  socket.join(roomName)
  socket.on('message-to-room', msg => {
    msg.type = `roomName: ${roomName}`
    socket.to(roomName).emit('message-to-room', msg)
    socket.emit('message-to-room', msg)
  })

  socket.on('disconnect', () => {
    console.log('disconnect: ', + id)
  })
})

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server started on ${ PORT } port!`))