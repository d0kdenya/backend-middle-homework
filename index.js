const express = require('express')
const indexRouter = require('./routes/indexRouter')
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.set('view engine', 'ejs')

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