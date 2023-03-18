const { Schema, model } = require('mongoose')

const todoSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    default: ""
  },
  authors: {
    type: String,
    default: ""
  },
  favorite: {
    type: String,
    default: ""
  },
  fileCover: {
    type: String,
    default: ""
  },
  fileName: {
    type: String,
    default: ""
  }
})

module.exports = model('Book', todoSchema)