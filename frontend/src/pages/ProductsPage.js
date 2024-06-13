import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_CATEGORIES } from '../graphql/queries';
import ProductList from '../components/product/ProductList';

const ProductsPage = () => {
  const { categoryId } = useParams();
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const category = data.categories.find(category => category.id === Number(categoryId));
  console.log(categoryId)
  console.log(data.categories)
  const categoryName = category ? category.name.charAt(0).toUpperCase() + category.name.slice(1) : 'All Products';
  console.log(categoryName)

  return (
      <div>
        <h2>{categoryName}</h2>
        <ProductList />
      </div>
  );
}

export default ProductsPage;