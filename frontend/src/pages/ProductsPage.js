import React from 'react';
import { Query } from '@apollo/client/react/components';
import { GET_PRODUCTS } from '../graphql/queries';

class ProductsPage extends React.Component {
  render() {

    return (
      <div className="products-page">
        <h1>Women</h1>
        <Query query={GET_PRODUCTS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return (
              <div className="products-grid">
                {data.products.map((product) => (
                  <div key={product.id} className="product-card">
                    <img src={product.gallery[0]} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>${product.price}</p>
                    <button>
                      Add to Cart
                    </button>
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

export default (ProductsPage);
