const { User, Book } = require('../models');
const { AuthenticationError } = require('../utils/auth')

const resolvers = {
    
    Query: {
        myLibrary: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

                return userData;
            }
            throw AuthenticationError;
        },
    },
    
    
    
    
    Mutation: {
        createUser: async (parent, { email, password, username }) => {
            try {
                const user = await User.create({email, password, username});
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

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },

    },
   
}


module.exports = resolvers;
