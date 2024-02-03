const { User, Book } = require('../models');
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

            // const correctPw = await user.isCorrectPassword(password);

            // if (!correctPw) {
            //     throw AuthenticationError;
            // }

            const token = signToken(user);
            return { token, user };
        },

        keepBook: async (parent, { input }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { keptBooks: input } },
                    { new: true }
                );

                return updatedUser;
            }

            throw AuthenticationError;
        },

        addReview: async (parent, { bookId, comments }, context) => {
            if (context.user) {
                try {
                    // Find the user by their ID
                    const user = await User.findById(context.user._id);

                    // Create a new comment with the user's ID
                    const newComment = {
                        userId: user._id,
                        comments,
                    };

                    // Create a new review with the user's ID and comments
                    const newReview = new Review({
                        userId: user._id,
                        comments: [newComment],
                    });

                    // Find the book by its ID and update it with the new review
                    const updatedBook = await Book.findByIdAndUpdate(
                        { _id: bookId },
                        { $push: { reviews: newReview } },
                        { new: true }
                    );

                    return updatedBook;
                } catch (error) {
                    console.error(error);
                    throw new Error('Error adding review');
                }
            }

            throw new AuthenticationError('User not logged in');
        },

    },

}

module.exports = resolvers;
