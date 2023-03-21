const express = require('express')
const redis = require('redis')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 3005
const REDIS_URL = process.env.REDIS_URL || 'localhost'

const client = redis.createClient({
  url: REDIS_URL
});

(async () => {
  await client.connect()
})()

app.use(cors())

app.get('/counter/:bookId', async (req, res) => {
  const { bookId } = req.params

  try {
    const cnt = await client.get(bookId)
    res.json({ message: `Счётчик просмотра книги по id: ${ bookId }`, cnt: cnt })
  } catch (e) {
    res.json({ errmsg: 'Ошибка redis: ', err: e })
  }
})

app.post('/counter/:bookId/incr', async (req, res) => {
  const { bookId } = req.params

  try {
    const cnt = await client.incr(bookId)
    res.json({ message: `Увеличили счётчик просмотра книги по id: ${ bookId }!`, cnt: cnt })
  } catch (e) {
    res.json({ errmsg: 'Ошибка redis: ', err: e })
  }
})

app.listen(PORT, () => {
  console.log(`Server started on ${ PORT } port!`)
})