const { User, Book } = require('../models');


module.exports = {
    Mutation: {
        createUser: async (parent, {email, password, username}) => {
            try {
                const user = await User.create(args);
                const token = signToken(user);

                return{ user, token };

            } catch (error) {
                console.log(error);
                throw new Error(error);
            }
        },
       
        
        
    },
    Query: {
        
    }
}


module.exports = resolvers;
