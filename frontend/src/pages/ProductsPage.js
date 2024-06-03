import React from 'react';
import { Query } from '@apollo/client/react/components';
import { GET_PRODUCTS } from '../graphql/queries';
import './ProductsPage.css';

class ProductsPage extends React.Component {
  render() {
    return (
      <div className="products-page">
        <h1 className="title">Women</h1>
        <Query query={GET_PRODUCTS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return (
              <div className="products-grid">
                {data.products.map(product => (
                  <div className="product-card" key={product.id}>
                    <img src={product.gallery[0]} alt={product.name} className="product-image" />
                    {!product.in_stock && <div className="out-of-stock">OUT OF STOCK</div>}
                    <div className="product-details">
                      <p className="product-name">{product.name}</p>
                      <p className="product-price">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default ProductsPage;