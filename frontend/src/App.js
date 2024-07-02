import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import client from './graphql/apolloClient';
import store from './redux/store';
import Header from './components/layout/Header';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <Router>
                        <Header />
                        <Routes>
                            <Route path="/" element={<ProductsPage />} />
                            <Route path="/all" element={<ProductsPage />} />
                            <Route path="/:CategoryName" element={<ProductsPage />} />
                            <Route path="/product/:productId" element={<ProductDetails />} />
                        </Routes>
                    </Router>
                </Provider>
            </ApolloProvider>
        );
    }
}

export default App;
