import { ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://35.219.236.54/',
  cache: new InMemoryCache(),
});

export default client;