import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/actions/cartActions";
import {
    GET_PRODUCT,
    GET_PRODUCT_ATTRIBUTES_BY_PRODUCT_ID,
    GET_PRODUCT_ATTRIBUTE_ITEMS_BY_PRODUCT_ID,
    GET_GALLERY_IMAGES_BY_PRODUCT_ID,
    GET_PRICE_BY_PRODUCT_ID,
    GET_CURRENCY
} from "../graphql/queries";
import { connect } from "react-redux";
import './ProductDetails.css';
import parse from 'html-react-parser';

function ProductDetails({ addToCart }) {
    const { productId } = useParams();

    const { loading: productLoading, error: productError, data: productData } = useQuery(GET_PRODUCT, {
        variables: { id: productId },
    });
    const { loading: attributesLoading, error: attributesError, data: attributesData } = useQuery(GET_PRODUCT_ATTRIBUTES_BY_PRODUCT_ID, {
        variables: { productId },
    });
    const { loading: attributeItemsLoading, error: attributeItemsError, data: attributeItemsData } = useQuery(GET_PRODUCT_ATTRIBUTE_ITEMS_BY_PRODUCT_ID, {
        variables: { productId },
    });
    const { loading: galleryLoading, error: galleryError, data: galleryData } = useQuery(GET_GALLERY_IMAGES_BY_PRODUCT_ID, {
        variables: { productId },
    });
    const { loading: pricesLoading, error: pricesError, data: pricesData } = useQuery(GET_PRICE_BY_PRODUCT_ID, {
        variables: { productId },
    });
    const { loading: currencyLoading, error: currencyError, data: currencyData } = useQuery(GET_CURRENCY);

    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [productDetails, setProductDetails] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (productData && attributesData && attributeItemsData && galleryData && pricesData && currencyData) {
            const product = productData.product || {};
            const attributes = attributesData.attributesByProductId || [];
            const attributeItems = attributeItemsData.attributeItemsByProductId || [];
            const gallery = galleryData.galleriesByProductId || [];
            const prices = pricesData.pricesByProductId || [];
            const currencyMap = (currencyData.currencies || []).reduce((acc, curr) => {
                acc[curr.id] = curr;
                return acc;
            }, {});
            const uniqueAttributeItems = attributeItems.reduce((acc, item) => {
                const key = `${item.attribute_id}-${item.value}`;
                if (!acc[key]) {
                    acc[key] = item;
                }
                return acc;
            }, {});
            const groupedAttributes = attributes.map(attr => ({
                ...attr,
                items: Object.values(uniqueAttributeItems).filter(item => item.attribute_id === attr.id)
            }));

            setProductDetails({
                ...product,
                attributes: groupedAttributes,
                gallery,
                prices: prices.map(price => ({
                    ...price,
                    currency: currencyMap[price.currency_id]
                }))
            });

            if (gallery.length > 0) {
                setSelectedImage(gallery[0].image_url);
            }
        }
    }, [productData, attributesData, attributeItemsData, galleryData, pricesData, currencyData, productId]);

    if (productLoading || attributesLoading || attributeItemsLoading || galleryLoading || pricesLoading || currencyLoading) {
        return <p>Loading...</p>;
    }

    if (productError || attributesError || attributeItemsError || galleryError || pricesError || currencyError) {
        console.log(productError, attributesError, attributeItemsError, galleryError, pricesError, currencyError);
        return <p>Error :(</p>;
    }

    const product = productDetails;

    if (!product || !product.attributes) {
        return <p>Product not found.</p>;
    }

    const handleAttributeChange = (attributeId, value) => {
        setSelectedAttributes((prevSelectedAttributes) => ({
            ...prevSelectedAttributes,
            [attributeId]: value,
        }));
    };

    const isAddToCartDisabled = product.attributes.some(
        (attr) => !selectedAttributes[attr.id]
    ) || product.in_stock === false;

    function toKebabCase(str) {
        return str.replace(/\s+/g, '-').toLowerCase();
    }

    return (
        <div className="product-details" data-testid={`product-${toKebabCase(product.name)}`}>
            <div className="product-gallery" data-testid="product-gallery">
                <div className="thumbnails">
                    {product.gallery.map((image, index) => (
                        <img key={index} src={image.image_url} alt={product.name}
                             onClick={() => setSelectedImage(image.image_url)}
                             className={selectedImage === image.image_url ? 'selected' : ''}/>))}
                </div>
                <div className="main-image">
                    {selectedImage && <img src={selectedImage} alt={product.name}/>}
                    {product.gallery.length > 1 && (
                        <div className="arrows">
                            <button
                                onClick={() => {
                                    const currentIndex = product.gallery.findIndex(
                                        (img) => img.image_url === selectedImage
                                    );
                                    const newIndex =
                                        (currentIndex + 1) % product.gallery.length;
                                    setSelectedImage(product.gallery[newIndex].image_url);
                                }}
                            >
                                {">"}
                            </button>
                            <button
                                onClick={() => {
                                    const currentIndex = product.gallery.findIndex(
                                        (img) => img.image_url === selectedImage
                                    );
                                    const newIndex =
                                        (currentIndex - 1 + product.gallery.length) %
                                        product.gallery.length;
                                    setSelectedImage(product.gallery[newIndex].image_url);
                                }}
                            >
                                {"<"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="product-info">
                <h1>{product.name}</h1>
                {product.attributes.map((attribute) => (
                    <div key={attribute.id} className="product-attribute"
                         data-testid={`product-attribute-${toKebabCase(attribute.name)}`}
                    >
                        <h3 className="title">{attribute.name.toUpperCase()}:</h3>
                        <div className="attribute-options">
                            {attribute.items.map((item) => {
                                const isSelected = selectedAttributes[attribute.id] === item.value;
                                return (
                                    <button key={item.value}
                                            className={`attribute-option${attribute.type === "swatch" ? " color-option" : ""} ${isSelected ? "selected" : ""}`}
                                            onClick={() => handleAttributeChange(attribute.id, item.value)}
                                            data-testid={`product-attribute-${toKebabCase(attribute.name)}-${(item.display_value)}${isSelected ? '-selected' : ''}`}>
                                        {attribute.type === "swatch" ? (
                                            <span className="color-swatch swatch"
                                                  style={{backgroundColor: item.value}}
                                                  data-testid={`product-attribute-${toKebabCase(attribute.name)}-${(item.value)}${isSelected ? '-selected' : ''}`}></span>
                                        ) : (
                                            item.value
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
                <div className="product-price">
                    <h3 className="title">PRICE:</h3>
                    <p className="product-price">
                        {`${product.prices[0].currency.symbol} ${product.prices[0].amount.toFixed(2)}`}
                    </p>
                </div>
                <button className={`add-to-cart ${isAddToCartDisabled ? 'disabled' : ''}`}
                        onClick={() => {
                            const attributesWithSelection = product.attributes.flatMap(attr => (
                                attr.items.map(item => ({
                                    ...item,
                                    selected: selectedAttributes[attr.id] === item.value
                                }))
                            ));
                            addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.prices[0].amount,
                                currency: product.prices[0].currency.symbol,
                                image: product.gallery[0]?.image_url,
                                quantity: 1,
                                attributes: attributesWithSelection
                            });
                        }}
                        data-testid="add-to-cart"
                        disabled={isAddToCartDisabled}>
                    ADD TO CART
                </button>
                <div className="product-description" data-testid="product-description">
                    {parse(product.description)}
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    addToCart: (item) => {
        return addToCart(item);
    },
};

export default connect(null, mapDispatchToProps)(ProductDetails);
