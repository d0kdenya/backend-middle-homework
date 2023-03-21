const express = require('express')
const { v4: uuid } = require('uuid')
const router = express.Router()
const axios = require('axios')
let request = require('request')

class Book {
  constructor(title = '', description = '', authors = '', favorite = '', fileCover = '', fileName = '', id = uuid()) {
    this.id = id
    this.title = title
    this.description = description
    this.authors = authors
    this.favorite = favorite
    this.fileCover = fileCover
    this.fileName = fileName
  }
}

const library = {
  book: []
}

router.get('/', (req, res) => {
  const { book } = library
  res.json(book)
})
router.get('/:id', async (req, res) => {
  const { book } = library
  const { id } = req.params
  const idx = book.findIndex(el => el.id === id)

  if (idx !== -1) {
    try {
      let cnt = 0
      await axios.post(`http://counter:3005/counter/${ id }/incr`)
      await axios.get(`http://counter:3005/counter/${ id }`)
        .then(function (res) {
          cnt = +res.data.cnt
        })
      res.json({
        book: book[idx],
        cnt
      })
    } catch (e) {
      res.json({ errmsg: 'Ошибка redis: ', err: e })
    }

  } else {
    res.status(404)
    res.json({
      'errCode': 404,
      'errMsg': 'Страница не найдена!'
    })
  }
})

router.post('/',   (req, res) => {
  const { book } = library
  const { title, description, authors, favorite, fileCover, fileName } = req.body

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
  book.push(newBook)

  res.status(201)
  res.json(newBook)
})

router.put('/:id', (req, res) => {
  const { book } = library
  const { id } = req.params
  const { title, description, authors, favorite, fileCover, fileName } = req.body
  const idx = book.findIndex(el => el.id === id)

  if (idx !== -1) {
    book[idx] = {
      ...book[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName
    }
    res.json(book[idx])
  } else {
    res.status(404)
    res.json({
      'errCode': 404,
      'errMsg': 'Страница не найдена!'
    })
  }
})

router.delete('/:id', (req, res) => {
  const { book } = library
  const { id } = req.params
  const idx = book.findIndex(el => el.id === id)

  if (idx !== -1) {
    book.splice(idx, 1)
    res.json('ok')
  } else {
    res.status(404)
    res.json({
      'errCode': 404,
      'errMsg': 'Страница не найдена!'
    })
  }
})

module.exports = router