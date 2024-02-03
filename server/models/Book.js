const { model, Schema } = require('mongoose');

const authorSchema = new Schema({
  name: String
});

const bookSchema = new Schema({
  title: String,
  bookId: { type: Number, unique: true },
  authors: [authorSchema],
  image: {
    data: Buffer,
    contentType: String
  },
  text: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

const Book = model('Book', bookSchema);

module.exports = Book;