import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
                            <Route path="/" element={<Navigate to="/1" />} />
                            <Route path="/:categoryId" element={<ProductsPage />} />
                            <Route path="/product/:productId" element={<ProductDetails />} />
                        </Routes>
                    </Router>
                </Provider>
            </ApolloProvider>
        );
    }
}

export default App;