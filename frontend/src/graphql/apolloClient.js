import { ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://35.212.55.30',
  cache: new InMemoryCache(),
});

export default client;