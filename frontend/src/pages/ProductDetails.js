import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
    GET_PRODUCT,
    GET_PRODUCT_ATTRIBUTES,
    GET_PRODUCT_ATTRIBUTE_ITEMS,
    GET_GALLERY_IMAGES,
    GET_PRICES,
    GET_CURRENCY
} from "../graphql/queries";
import { addToCart } from "../redux/actions/cartActions";
import { connect } from "react-redux";
import './ProductDetails.css';

function ProductDetails({ addToCart }) {
    const { productId } = useParams();

    // Fetch all necessary data
    const { loading: productLoading, error: productError, data: productData } = useQuery(GET_PRODUCT, {
        variables: { id: productId },
    });
    const { loading: attributesLoading, error: attributesError, data: attributesData } = useQuery(GET_PRODUCT_ATTRIBUTES);
    const { loading: attributeItemsLoading, error: attributeItemsError, data: attributeItemsData } = useQuery(GET_PRODUCT_ATTRIBUTE_ITEMS);
    const { loading: galleryLoading, error: galleryError, data: galleryData } = useQuery(GET_GALLERY_IMAGES);
    const { loading: pricesLoading, error: pricesError, data: pricesData } = useQuery(GET_PRICES);
    const { loading: currencyLoading, error: currencyError, data: currencyData } = useQuery(GET_CURRENCY);

    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        if (productData && attributesData && attributeItemsData && galleryData && pricesData && currencyData) {
            const product = productData.product;
            const attributes = attributesData.attributes.filter(attr => attr.product_id === product.id);
            const attributeItems = attributeItemsData.attributeItems;
            const gallery = galleryData.galleries.filter(gallery => gallery.product_id === product.id);
            const prices = pricesData.prices.filter(price => price.product_id === product.id);
            const currencyMap = currencyData.currencies.reduce((acc, curr) => {
                acc[curr.id] = curr;
                return acc;
            }, {});

            const enrichedAttributes = attributes.map(attr => ({
                ...attr,
                items: attributeItems.filter(item => item.attribute_id === attr.id)
            }));

            setProductDetails({
                ...product,
                attributes: enrichedAttributes,
                gallery,
                prices: prices.map(price => ({
                    ...price,
                    currency: currencyMap[price.currency_id]
                }))
            });
        }
    }, [productData, attributesData, attributeItemsData, galleryData, pricesData, currencyData]);

    if (productLoading || attributesLoading || attributeItemsLoading || galleryLoading || pricesLoading || currencyLoading){
        return <p>Loading...</p>;
    }

    if (productError || attributesError || attributeItemsError || galleryError || pricesError || currencyError) {
        return <p>Error :(</p>;
    }

    const product = productDetails;

    if (!product || !product.attributes) {
        return <p>Product not found.</p>;
    }

    const handleAttributeChange = (attributeId, value) => {
        setSelectedAttributes({
            ...selectedAttributes,
            [attributeId]: value,
        });
    };

    const isAddToCartDisabled = product.attributes.some(
        (attr) => !selectedAttributes[attr.id]
    );
    console.log(product)
    return (
        <div className="product-details">
            <div className="product-gallery" data-testid="product-gallery">
                {product.gallery.map((image, index) => (
                    <img key={index} src={image.image_url} alt={product.name} />
                ))}
            </div>
            <div className="product-info">
                <h1>{product.name}</h1>
                {product.attributes.map((attribute) => (
                    <div
                        key={attribute.id}
                        className="product-attribute"
                        data-testid={`product-attribute-${attribute.name.toLowerCase().replace(/ /g, '-')}`}
                    >
                        <h3>{attribute.name}</h3>
                        <div className="attribute-options">
                            {attribute.items.map((item) => (
                                <button key={item.value} className={`attribute-option ${selectedAttributes[attribute.id] === item.value ? "selected" : ""}`}
                                    onClick={() => handleAttributeChange(attribute.id, item.value)}>
                                    {attribute.type === "swatch" ? (<span className="swatch" style={{ backgroundColor: item.value }}></span>) : (item.display_value)}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="product-price">
                    <h3>Price:</h3>
                    <p>{product.prices[0].currency.symbol}{product.prices[0].amount.toFixed(2)}</p>
                </div>
                <button className="add-to-cart" onClick={() => addToCart({ ...product, selectedAttributes })} data-testid="add-to-cart" disabled={isAddToCartDisabled}>
                    Add to Cart
                </button>
                <div className="product-description" data-testid="product-description">
                    {product.description}
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    addToCart,
};

export default connect(null, mapDispatchToProps)(ProductDetails);
