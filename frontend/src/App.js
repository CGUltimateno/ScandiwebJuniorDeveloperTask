import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
          <ProductsPage />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
