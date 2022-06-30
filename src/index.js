const { ApolloServer } = require('apollo-server');
// const MockData = require('./mocks');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const TrackAPI = require('./datasources/track-api');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: 'bounded',
  introspection: false,
  dataSources: () => {
    return {
      trackAPI: new TrackAPI(),
    };
  },
});
server.listen().then(() => {
  console.log(`
      🚀  Server is running!
      🔉  Listening on port 4000
      📭  Query at https://studio.apollographql.com/dev
    `);
});
