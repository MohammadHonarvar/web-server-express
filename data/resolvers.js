import { Friends } from './dbConnectors';

export const resolvers = {
  Query: {
    getFriend: ({ id }) => {
      return new Friend(id, friendDB[id]);
    }
  },
  Mutation: {
    createFriend: (root, { input }) => {
      const newFriend = new Friends({
        fullName: input.fullName,
        gender: input.gender,
        email: input.email,
        contacts: input.contacts,
      });
      newFriend.id = newFriend._id;
  
      return new Promise((resolve, object) => {
        newFriend.save(err => {
          if (err) reject(err);
          resolve(newFriend);
        })
      });
    }
  }
};
