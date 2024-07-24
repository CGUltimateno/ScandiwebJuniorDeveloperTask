import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import client from './graphql/apolloClient';
import store from './redux/store';
import Header from './components/layout/Header';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';

const App = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const openCartOverlay = () => setIsCartOpen(true);

    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Router>
                    <Header isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
                    <Routes>
                        <Route path="/" element={<ProductsPage setIsCartOpen={setIsCartOpen} />} />
                        <Route path="/all" element={<ProductsPage setIsCartOpen={setIsCartOpen} />} />
                        <Route path="/:CategoryName" element={<ProductsPage setIsCartOpen={setIsCartOpen} />} />
                        <Route path="/product/:productId" element={<ProductDetails openCartOverlay={openCartOverlay} />} />
                    </Routes>
                </Router>
            </Provider>
        </ApolloProvider>
    );
}

export default App;
