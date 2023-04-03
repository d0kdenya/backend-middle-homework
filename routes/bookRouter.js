const express = require('express')
const router = express.Router()
const { v4: uuid } = require('uuid')

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
  res.render('book/index', {
    title: 'Book',
    books: book
  })
})

router.get('/create', (req, res) => {
  res.render('book/create', {
    title: 'Book | create',
    book: {},
  })
})


router.get('/:id', (req, res) => {
  const { book } = library
  const { id } = req.params
  const idx = book.findIndex(el => el.id === id)

  if (idx === -1) {
    res.redirect('/404')
  }

  res.render('book/view', {
    title: 'Book | View',
    book: book[idx]
  })
})

router.get('/update/:id', (req, res) => {
  const { book } = library
  const { id } = req.params
  const idx = book.findIndex(el => el.id === id)

  if (idx === -1) {
    res.redirect('/404')
  }

  res.render('book/update', {
    title: 'Book | View',
    book: book[idx]
  })
})

router.post('/create', (req, res) => {
  const { book } = library
  const { title, description, authors, favorite, fileCover, fileName } = req.body

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
  book.push(newBook)

  res.redirect('/api/books')
})

router.post('/update/:id', (req, res) => {
  const { book } = library
  const { id } = req.params
  const { title, description, authors, favorite, fileCover, fileName } = req.body
  const idx = book.findIndex(el => el.id === id)

  if (idx === -1) {
    res.redirect('/404')
  }

  book[idx] = {
    ...book[idx],
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  }

  res.redirect(`/api/books/${ id }`)
})

router.post('/delete/:id', (req, res) => {
  const { book } = library
  const { id } = req.params
  const idx = book.findIndex(el => el.id === id)

  if (idx === -1) {
    res.redirect('/404')
  }

  book.splice(idx, 1)
  res.redirect('/api/books')
})

module.exports = router