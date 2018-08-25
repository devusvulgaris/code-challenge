// @TODO: implement the GraphQL schema here if you are doing the bonus question
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

// Mocking backend data.
const fs = require('fs');
const jsonData = fs.readFileSync('data/data.json');
const users = JSON.parse(jsonData);

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'User from users list',
    fields: () => ({
      user: {
        type: new GraphQLObjectType({
          name: 'User',
          fields: () => ({
            id: {
              type: GraphQLInt,
            },
            name: {
              type: GraphQLString,
            },
          }),
        }),
        args: {
          id: {
            type: GraphQLInt,
            description: 'User id for selection',
          },
        },
        resolve: (root, { id }) => users.filter(user => user.id == id)[0],
      },
    }),
  }),
});

module.exports = schema;
