import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import store from './redux/store';
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <div className="App">
            <Header />
            <ProductsPage />
          </div>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
