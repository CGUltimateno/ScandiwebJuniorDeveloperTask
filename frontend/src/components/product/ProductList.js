import React from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_PRODUCTS } from "../../graphql/queries";

export function ProductList() {
    const { categoryId } = useParams();
    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error(error);
        return <p>Error :(</p>;
    }

    const filteredProducts = categoryId === '1' ? data.products : data.products.filter(product => product.category_id === parseInt(categoryId));
    return (
        <div className="products-list">
            {filteredProducts.map((product) => (
                <div className='product-card' key={product.id}>
                    <div className='product-img'>
                        <Link to={`/product/${product.id}`}>
                            alt={product.name} />
                        </Link>
                    </div>
                    <div className='product-info'>
                        <Link to={`/product/${product.id}`}>
                            <h3>{product.name}</h3>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;