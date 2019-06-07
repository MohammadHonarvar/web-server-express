import { resolvers } from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';

// const schema = buildSchema(`
//   type Friend {
//     id: ID,
//     fullName: String,
//     gender: String,
//     emails: [Email]!
//   }
//   type Email {
//     email: String
//   }
//   type Query {
//     friend: Friend
//   }
// `);

const typeDefs = `
  type Friend {
    id: ID,
    fullName: String,
    gender: Gender,
    email: String,
    contacts: [Contact]
  }

  type Contact {
    fullName: String,
    phone: String
  }

  enum Gender {
    MALE
    FEMALE
    OTHERS
  }

  input InputFriend {
    id: ID,
    fullName: String!,
    gender: Gender,
    email: String,
    contacts: [InputContact]
  }

  input InputContact {
    fullName: String,
    phone: String
  }

  type Mutation {
    createFriend(input: InputFriend): Friend
  }

  type Query {
    getFriend(id: ID): Friend
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };