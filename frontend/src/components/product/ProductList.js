import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_PRODUCTS, GET_GALLERY_IMAGES, GET_PRICES, GET_CURRENCY } from "../../graphql/queries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './ProductList.css';

export function ProductList() {
    const { categoryId } = useParams();
    const { loading: productsLoading, error: productsError, data: productsData } = useQuery(GET_PRODUCTS);
    const { loading: galleryLoading, error: galleryError, data: galleryData } = useQuery(GET_GALLERY_IMAGES);
    const { loading: pricesLoading, error: pricesError, data: pricesData } = useQuery(GET_PRICES);
    const { loading: currencyLoading, error: currencyError, data: currencyData } = useQuery(GET_CURRENCY);

    const [products, setProducts] = useState([]);

    function toKebabCase(str) {
        return str
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }

    useEffect(() => {
        if (productsData && galleryData && pricesData && currencyData) {
            const mergedProducts = productsData.products.map(product => {
                const productImages = galleryData.galleries.filter(image => image.product_id === product.id);
                const productPrice = pricesData.prices.find(price => price.product_id === product.id);
                const productCurrency = currencyData.currencies.find(currency => currency.id === productPrice.currency_id);
                const productCurrencySymbol = productCurrency ? productCurrency.symbol : null;
                return { ...product, gallery: productImages, price: productPrice ? productPrice.amount : 0, currency: productCurrencySymbol };
            });
            setProducts(mergedProducts);
        }
    }, [productsLoading, galleryLoading, pricesLoading, productsData, galleryData, pricesData, currencyData]);

    if (productsLoading || galleryLoading || pricesLoading) return <p>Loading...</p>;
    if (productsError || galleryError || pricesError) {
        console.error(productsError?.graphQLErrors, galleryError?.graphQLErrors, pricesError?.graphQLErrors);
        console.error(productsError?.networkError, galleryError?.networkError, pricesError?.networkError);
        return <p>Error :(</p>;
    }

    const filteredProducts = categoryId === '1' ? products : products.filter(product => product.category_id === parseInt(categoryId));
    return (
        <div className="products-grid">
            {filteredProducts.map((product) => (
                <div className='product-card' key={product.id} data-testid={`product-${toKebabCase(product.name)}`}>
                    <div className='product-img'>
                    <Link to={`/product/${product.id}`}>
                            {product.gallery[0] && <img src={product.gallery[0].image_url} alt={product.name} className="product-image" />}
                            {!product.in_stock && <div className="out-of-stock">OUT OF STOCK</div>}
                        </Link>
                        {product.in_stock && (
                        <button className="cart-button">
                            <FontAwesomeIcon icon={faShoppingCart}/>
                        </button>
                        )}
                    </div>
                    <div className='product-info'>
                        <Link to={`/product/${product.id}`}>
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">{product.currency}{product.price}</p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;