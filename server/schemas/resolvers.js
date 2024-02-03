const { User, Book } = require('../models');
const Review = require('../models/Review')
const { AuthenticationError, signToken } = require('../utils/auth')

const resolvers = {

    Query: {
        myLibrary: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

                return userData;
            }
            throw AuthenticationError;
        },
        getBooks: async (parents, args) => {
            const bookData = await Book.find(args);

            console.log('Retrieved book data:', bookData);

            return bookData;
        },
        getSingleBook: async (parent, { bookId }) => {
            return Book.findOne({ _id: bookId });
        }
    },

    Mutation: {
        createUser: async (parent, { email, password, username }) => {
            try {
                const user = await User.create({ email, password, username });
                const token = signToken(user);

                return { user, token };

            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },


        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }
            // this is comming from the user model itself
            const correctPw = await user.isCorrectPassword(password);

            // check if it is the correct hashed password
            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },

        keepBook: async (parent, { input }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { keptBooks: input } },
                    { new: true, runValidators: true }
                );

                return updatedUser;
            }

            throw AuthenticationError;
        },
        addReview: async (parent, { bookId, comments }, context) => {
            if (context.user) {
                try {
                    const user = await User.findById(context.user._id);

                    const newComment = {
                        userId: user._id,
                        comments,
                    };

                    const newReview = new Review({
                        userId: user._id,
                        comments: [newComment],
                    });

                    // Find the book by its _id
                    const updatedBook = await Book.findById(bookId);

                    // Update the book with the new review
                    updatedBook.reviews.push(newReview);
                    await updatedBook.save();

                    // Find the added review from the updatedBook
                    const addedReview = updatedBook.reviews.find(
                        (review) => review.userId && review.userId.toString() === user._id.toString()
                    );

                    if (!addedReview) {
                        console.error('Review not found after update');
                        throw new Error('Review not found after update');
                    }

                    // Include necessary fields and comments in the response
                    const responseData = {
                        _id: addedReview._id,
                        title: updatedBook.title,
                        bookId: updatedBook.bookId,
                        authors: updatedBook.authors,
                        image: updatedBook.image,
                        text: updatedBook.text,
                        comments: addedReview.comments && addedReview.comments.map(comment => comment.comments),
                    };

                    return responseData;

                } catch (error) {
                    console.error('Error adding review:', error);
                    throw new Error('Error adding review');
                }
            }

            throw AuthenticationError;
        },













        removeBook: async (parent, { _id }, context) => {
            if (context.user) {
                return User.findOneAndUpdate({
                    _id: context.user._id
                },
                    {
                        $pull: { keptBooks: { _id } }
                    },
                    { new: true })
            }
            throw AuthenticationError;
        },

    },

}

module.exports = resolvers;
