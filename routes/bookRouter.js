const express = require('express')
const uploadMiddleware = require('../middlewares/uploadMiddleware')
const path = require('path')
const { v4: uuid } = require('uuid')
const router = express.Router()

class Book {
  constructor(title = '', description = '', authors = '', favorite = '', fileCover = '', fileName = '', fileBook = '', id = uuid()) {
    this.id = id
    this.title = title
    this.description = description
    this.authors = authors
    this.favorite = favorite
    this.fileCover = fileCover
    this.fileName = fileName
    this.fileBook = fileBook
  }
}

const library = {
  book: []
}

router.get('/', (req, res) => {
  const { book } = library
  res.json(book)
})
router.get('/:id', (req, res) => {
  const { book } = library
  const { id } = req.params
  const idx = book.findIndex(el => el.id === id)

  if (idx !== -1) {
    res.json(book[idx])
  } else {
    res.status(404)
    res.json({
      'errCode': 404,
      'errMsg': 'Страница не найдена!'
    })
  }
})
router.get('/:id/download', (req, res) => {
  const { book } = library
  const { id } = req.params
  const idx = book.findIndex(el => el.id === id)

  if (idx !== -1) {
    res.download(path.join(__dirname, `../public/uploads/${ book[idx].fileBook }`))
  } else {
    res.status(404)
    res.json({
      'errCode': 404,
      'errMsg': 'Страница не найдена!'
    })
  }
})

router.post('/',  uploadMiddleware.single('fileBook'), (req, res) => {
  const { book } = library
  const { title, description, authors, favorite, fileCover, fileName } = req.body
  const fileBook = req.file.filename

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)
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