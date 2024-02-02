const { model, Schema } = require('mongoose')
const mongoose = require('mongoose')



const commentsSchema = new Schema({
    comments: String,
})

const reviewSchema = new Schema({
    // id is auto-generated via mongoose
    rating: { type: Number, min: 0, max: 5, default: 0 },
    comments: [commentsSchema],
})




const Review = model('Review', reviewSchema)

module.exports = Review