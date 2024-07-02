import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_CATEGORIES } from '../graphql/queries';
import ProductList from '../components/product/ProductList';
import './ProductsPage.css';
const ProductsPage = () => {
    const { CategoryName } = useParams();
    const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    const category = data.categories.find(category => category.name.toLowerCase() === CategoryName);

    const TopName = category.name === "all" ?  'All Products' : category.name.toUpperCase()[0] + category.name.slice(1);

  return (
      <div>
        <h2 className="h2">{TopName}</h2>
        <ProductList />
      </div>
  );
}

export default ProductsPage;