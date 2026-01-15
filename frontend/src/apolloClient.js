import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const defaultGraphqlUrl = 'http://127.0.0.1:3000/graphql';
const rawGraphqlUrl = process.env.GRAPHQL_URL || defaultGraphqlUrl;

const normalizeGraphqlUrl = (value) => {
  if (!value) {
    return defaultGraphqlUrl;
  }

  const withProtocol = /^[a-z]+:\/\//i.test(value) ? value : `https://${value}`;
  const normalizedBase = withProtocol.replace(/\/$/, '');

  return normalizedBase.includes('/graphql') ? normalizedBase : `${normalizedBase}/graphql`;
};

const graphqlUrl = normalizeGraphqlUrl(rawGraphqlUrl);

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
