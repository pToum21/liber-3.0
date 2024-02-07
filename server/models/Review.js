const { model, Schema } = require('mongoose');

const commentsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: String,
});

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bookId: {
        type:Schema.Types.ObjectId,
        ref: 'Book',
    },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    content: String,
    comments: [commentsSchema],
});

const Review = model('Review', reviewSchema);

module.exports = Review;