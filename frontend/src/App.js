import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import client from './apolloClient';
import store from './redux/store';
import Header from './components/layout/Header';
import ProductsPage from './pages/ProductsPage';
import ProductList from "./components/product/ProductList";

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <Router>
                        <Header />
                        <Routes>
                            <Route path="/:categoryId" element={<ProductsPage />} />
                        </Routes>
                    </Router>
                </Provider>
            </ApolloProvider>
        );
    }
}

export default App;