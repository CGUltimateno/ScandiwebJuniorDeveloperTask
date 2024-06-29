import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    GET_PRODUCTS,
    GET_GALLERY_IMAGES,
    GET_PRICES,
    GET_CURRENCY,
    GET_PRODUCT_ATTRIBUTE_ITEMS_BY_PRODUCT_ID
} from "../../graphql/queries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { addToCart } from '../../redux/actions/cartActions';
import './ProductList.css';

export function ProductList() {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const { loading: productsLoading, error: productsError, data: productsData } = useQuery(GET_PRODUCTS);
    const { loading: galleryLoading, error: galleryError, data: galleryData } = useQuery(GET_GALLERY_IMAGES);
    const { loading: pricesLoading, error: pricesError, data: pricesData } = useQuery(GET_PRICES);
    const {data: currencyData } = useQuery(GET_CURRENCY);
    const [products, setProducts] = useState([]);
    const [getProductAttributes] = useLazyQuery(GET_PRODUCT_ATTRIBUTE_ITEMS_BY_PRODUCT_ID);

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

    const handleAddToCart = async (product) => {
        const { data } = await getProductAttributes({ variables: { productId: product.id } });
        if (data && data.attributeItemsByProductId) {
            const attributes = data.attributeItemsByProductId;
            const groupedAttributes = attributes.reduce((acc, attr) => {
                if (!acc[attr.attribute_id]) {
                    acc[attr.attribute_id] = [];
                }
                acc[attr.attribute_id].push(attr);
                return acc;
            }, {});
            const selectedAttributes = Object.values(groupedAttributes).map(attrs => attrs.map((attr, index) => ({
                ...attr,
                selected: index === 0 // Only select the first attribute item of each attribute
            }))).flat();
            dispatch(addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                currency: product.currency,
                image: product.gallery[0]?.image_url,
                quantity: 1,
                attributes: selectedAttributes
            }));
        } else {
            dispatch(addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                currency: product.currency,
                image: product.gallery[0]?.image_url,
                quantity: 1,
                attributes: []
            }));
        }
    };

    function toKebabCase(str) {
        return str
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .join('-')
            .toLowerCase();
    }

    return (
        <div className="products-grid">
            {Array.isArray(filteredProducts) && filteredProducts.map((product) => (
                <div className='product-card' key={product.id} data-testid={`product-${toKebabCase(product.name)}`}>
                    <div className='product-img'>
                        <Link to={`/product/${product.id}`}>
                            {product.gallery[0] && <img src={product.gallery[0].image_url} alt={product.name} className="product-image" />}
                            {!product.in_stock && <div className="out-of-stock">OUT OF STOCK</div>}
                        </Link>
                        {product.in_stock && (
                            <button className="cart-button" onClick={() => handleAddToCart(product)}>
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
