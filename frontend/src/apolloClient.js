import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const graphqlUrl = process.env.GRAPHQL_URL || 'http://127.0.0.1:3000/graphql';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cart: {
          merge: false
        }
      }
    }
  }
});

export const apolloClient = new ApolloClient({
  link: createHttpLink({ uri: graphqlUrl }),
  cache
});
