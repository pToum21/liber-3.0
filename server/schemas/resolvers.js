const { User, Book, Review } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth')

const resolvers = {

    Query: {
        // profile page
        myLibrary: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

                return userData;
            }
            throw AuthenticationError;
        },

        searchAllBooks: async (parents, { searchTerm }) => {
            // destructured searchTerm from args because otherwise, MongoDB will look up {searchTerm:'title'} rather than 'title'
            const searchData = await Book.find({
                // or operator to match docs from either title or author
                $or: [
                    // using regex to make it so search works with case-insensitivity
                    { title: { $regex: searchTerm, $options: 'i' } },
                    { 'authors.name': { $regex: searchTerm, $options: 'i' }  }
                ]
            })

            return searchData;
        },

        getBooks: async (parents, args) => {
            const bookData = await Book.find().skip(args.skip).limit(5);
            const bookCount = await Book.count();

            return { books: bookData, bookCount: bookCount };
        },
        getSingleBook: async (parent, { _id }) => {
            return Book.findOne({ _id }).populate({path:"reviews", populate:{path:"userId"}})
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



        addReview: async (parent, { bookId, content, rating }, context) => {
            if (context.user) {
                const review = await Review.create({
                    userId: context.user._id,
                    bookId: bookId,
                    rating: rating,
                    content: content
                })
                const book = await Book.findByIdAndUpdate(bookId, {
                    $push: {
                        reviews: review._id
                    }
                }, { new: true })
                return book.populate("reviews")
            }
            throw AuthenticationError
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

        addComment: async (parent, args, context) => {
            if (context.user) {
                const review = await Review.findByIdAndUpdate(args.reviewId, {
                    $push: {
                        comments: {
                            userId: context.user._id,
                            content: args.content
                        }
                    }
                }, {new: true})

                return review;
            } throw AuthenticationError
        }

    },

}

module.exports = resolvers;
