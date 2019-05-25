const { ApolloServer } = require('apollo-server-cloud-functions');
const schema = require('./data/schema');
const resolvers = require('./data/resolvers.ts');

const setupGraphQLServer = () => {
  // Provide resolver functions for your schema fields
  const server = new ApolloServer({
    schema,
    resolvers,
    playground: true,
    introspection: true,
    context: ({ req, res }) => ({
      headers: req.headers,
      req,
      res
    })
  });

  const corsConfig = {
    cors: {
      origin: true,
      credentials: true
    }
  };

  return server.createHandler(corsConfig);
};

module.exports = setupGraphQLServer;
