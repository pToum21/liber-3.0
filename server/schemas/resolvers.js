const { User, Book, Review } = require('../models');
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



        addReview: async (parent, { bookId, comments, rating }, context) => {
            if (context.user) {
                try {
                    const user = await User.findById(context.user._id);

                    const newComment = {
                        userId: user._id,
                        comments,
                    };

                    const newReview = new Review({
                        // _id
                        userId: user._id,
                        comments: [newComment],
                        rating: rating,
                    });

                    // saves document into database (conmpass)
                    await newReview.save();

                    // Find the book by its _id and update it with the new review's _id
                    const updatedBook = await Book.findById(bookId);
                    updatedBook.reviews.push(newReview._id); // Push the review's _id
                    await updatedBook.save();

                    // Assuming you need to return the added review, fetch it back along with necessary book details
                    // Since reviews are now referenced by ID, fetch the detailed review directly if needed
                    const addedReview = await Review.findById(newReview._id);

                    if (!addedReview) {
                        console.error('Review not found after update');
                        throw new Error('Review not found after update');
                    }

                    // Structure the response as needed, including the bookId
                    const responseData = {
                        _id: addedReview._id,
                        title: updatedBook.title,
                        bookId: bookId, // Ensuring the bookId is included in the response
                        authors: updatedBook.authors,
                        image: updatedBook.image,
                        text: updatedBook.text,
                        reviews: [
                            {
                                _id: addedReview._id,
                                comments: addedReview.comments.map(comment => ({
                                    _id: comment._id,
                                    userId: comment.userId,
                                    comments: comment.comments,
                                })),
                                rating: addedReview.rating, // Include the rating here
                            }
                        ],
                    };

                    return responseData;

                } catch (error) {
                    console.error('Error adding review:', error);
                    throw new Error('Error adding review');
                }
            } else {
                throw new Error('Authentication Error'); // Adjust as per your error handling
            }
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
