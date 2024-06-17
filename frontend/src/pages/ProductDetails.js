import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
    GET_PRODUCT,
    GET_PRODUCT_ATTRIBUTES,
    GET_PRODUCT_ATTRIBUTE_ITEMS,
    GET_GALLERY_IMAGES,
    GET_PRICES,
    GET_CURRENCY,
    GET_GALLERY_IMAGES_BY_PRODUCT_ID,
    GET_PRICE_BY_PRODUCT_ID,
    GET_PRODUCT_ATTRIBUTE_ITEMS_BY_PRODUCT_ID,
    GET_PRODUCT_ATTRIBUTES_BY_PRODUCT_ID
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

            const groupedAttributes = attributes.map(attr => ({
                ...attr,
                items: attributeItems.filter(item => item.attribute_id === attr.id)
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
    }, [productData, attributesData, attributeItemsData, galleryData, pricesData, currencyData]);

    if (productLoading || attributesLoading || attributeItemsLoading || galleryLoading || pricesLoading || currencyLoading) {
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

    return (
        <div className="product-details">
            <div className="product-gallery" data-testid="product-gallery">
                <div className="thumbnails">
                    {product.gallery.map((image, index) => (
                        <img
                            key={index}
                            src={image.image_url}
                            alt={product.name}
                            onClick={() => setSelectedImage(image.image_url)}
                            className={selectedImage === image.image_url ? 'selected' : ''}
                        />
                    ))}
                </div>
                <div className="main-image">
                    {selectedImage && <img src={selectedImage} alt={product.name} />}
                </div>
            </div>
            <div className="product-info">
                <h1>{product.name}</h1>
                {product.attributes.map((attribute) => (
                    <div
                        key={attribute.id}
                        className="product-attribute"
                        data-testid={`product-attribute-${attribute.name.toLowerCase().replace(/ /g, '-')}`}
                    >
                        <h3 className="title">{attribute.name.toUpperCase()}:</h3>
                        <div className="attribute-options">
                            {attribute.items.map((item) => (
                                <button key={item.value}
                                        className={`attribute-option ${attribute.type === "swatch" ? "color-options" : ""} ${selectedAttributes[attribute.id] === item.value ? "selected" : ""}`}
                                        onClick={() => handleAttributeChange(attribute.id, item.value)}>
                                    {attribute.type === "swatch" ? (<span className="color-swatch swatch" style={{backgroundColor: item.value}}></span>) : (item.display_value)}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="product-price">
                    <h3 className="title">PRICE:</h3>
                    <p className="price">{product.prices[0].currency.symbol}{product.prices[0].amount.toFixed(2)}</p>
                </div>
                <button className="add-to-cart" onClick={() => addToCart({...product, selectedAttributes})}
                        data-testid="add-to-cart" disabled={isAddToCartDisabled}>
                    ADD TO CART
                </button>
                <div className="product-description" data-testid="product-description"
                     dangerouslySetInnerHTML={{__html: product.description}}/>
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    addToCart,
};

export default connect(null, mapDispatchToProps)(ProductDetails);
