const { model, Schema } = require('mongoose')

const bookSchema = new Schema({
    // id is auto-generated via mongoose
    title: String,
    authors: [
        {
          type: String,
        },
      ],
    image: String,
    text: String
})

const Book = model('Book', bookSchema)

module.exports = Book