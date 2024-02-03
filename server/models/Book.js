const { model, Schema } = require('mongoose')
const mongoose = require('mongoose')

const authorSchema = new Schema({
  name: String
})

const bookSchema = new Schema({
  // id is auto-generated via mongoose
  title: String,
  bookId: { type: Number, unique: true },
  authors: [authorSchema],
  image: BLOB('tiny'),
  text: String
})


// Maybe we add comments schema here

const Book = model('Book', bookSchema)

module.exports = Book