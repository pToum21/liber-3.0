const { model, Schema } = require('mongoose')
const mongoose = require('mongoose')

const authorSchema = new Schema({
  name: String
})

const bookSchema = new Schema({
    // id is auto-generated via mongoose
    title: String,
    bookId: Number,
    authors: [authorSchema],
    image: String,
    text: String
})

const Book = model('Book', bookSchema)

module.exports = Book