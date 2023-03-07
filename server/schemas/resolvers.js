const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async(parent, args, context) => {
      if(context.user){
        const user = await User.findOne({
          _id: context.user._id
        })
        .select("-password -__v")
        .populate("savedBooks")

        return user
      }
    },
  },
  Mutation: {
    addUser: async(parent, args) => {
      try{
        const user = await User.create(args);

        if(!user){
          throw AuthenticationError("This username is invalid");
        }
        const token = signToken(user);
        return {token, user}
      } catch(error){
        throw new AuthenticationError("Incorrect username or password")
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    saveBook:  async (parent, args, context) => {
      if(context.user){
        const {bookData} = args;
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
        return updatedUser 
      }

      throw new AuthenticationError();
    },

    deleteBook: async (parent, args, context) => {
      const {bookId} = args;
      if(context.user){
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks:{bookId} } },
          { new: true }
        );
        return updatedUser 
      }

      throw new AuthenticationError();
    }
  },
};

module.exports = resolvers;