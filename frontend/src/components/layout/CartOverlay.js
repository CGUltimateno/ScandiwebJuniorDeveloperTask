import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { incrementItem, decrementItem, removeItem, clearCart } from '../../redux/actions/cartActions';
import styles from './CartOverlay.module.css';
import { CREATE_ORDER, CREATE_ORDER_ITEM } from '../../graphql/queries';

const CartOverlay = ({ onClose }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    const [cartIsOpen, setCartIsOpen] = useState(true);
    const totalItems = cartItems.reduce((total, currentItem) => total + currentItem.quantity, 0);
    const [createOrder] = useMutation(CREATE_ORDER);
    const [createOrderItem] = useMutation(CREATE_ORDER_ITEM);
    useEffect(() => {
    }, [cartItems, totalItems]);
    const handleIncrement = (id) => {
        dispatch(incrementItem(id));
    };

    const handleDecrement = (id) => {
        const item = cartItems.find((item) => item.id === id);
        if (item.quantity > 1) {
            dispatch(decrementItem(id));
        } else {
            dispatch(removeItem(id));
        }
    };

    const handleClose = () => {
        setCartIsOpen(false);
        onClose();
    };

    const handlePlaceOrder = async () => {
        try {
            const { data: orderData } = await createOrder({ variables: { total: parseFloat(totalAmount) } });
            const orderId = orderData.createOrderWithItems.id;

            for (const item of cartItems) {
                const selectedAttributes = item.attributes.filter(attribute => attribute.selected);

                for (const attribute of selectedAttributes) {
                    console.log({
                        order_id: orderId,
                        product_id: item.id,
                        attribute_id: attribute.attribute_id,
                        attribute_item_id: attribute.display_value,
                        quantity: item.quantity
                    });

                    await createOrderItem({
                        variables: {
                            order_id: orderId,
                            product_id: item.id,
                            attribute_id: attribute.attribute_id,
                            attribute_item_id: attribute.display_value,
                            quantity: item.quantity
                        }
                    });
                }
            }

            dispatch(clearCart());
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    function groupAttributesByAttributeId(attributes) {
        if (!Array.isArray(attributes)) {
            console.error('attributes is not an array:', attributes);
            return {};
        }

        return attributes.reduce((acc, attr) => {
            if (!acc[attr.attribute_id]) {
                acc[attr.attribute_id] = [];
            }
            acc[attr.attribute_id].push(attr);
            return acc;
        }, {});
    }

    return (
        <>
            {cartIsOpen && <div className={styles.overlay} onClick={handleClose}></div>}
            <div className={styles.cartOverlay} data-testid="cart-overlay">
                <div className={styles.cartHeader}>
                    <div className={styles.cartTitleContainer}>
                        <h2 className={styles.cartTitle}>My Bag,</h2>
                        <h2 className={styles.CartCount}>{`${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}</h2>
                    </div>
                    <button onClick={handleClose} className={styles.closeBtn}>&times;</button>
                </div>
                <div className={styles.cartItems}>
                    {cartItems.map((item) => {
                        const groupedAttributes = groupAttributesByAttributeId(item.attributes);
                        return (
                            <div key={`${item.id}-${JSON.stringify(item.attributes)}`} className={styles.cartItem}>
                                <div className={styles.cartItemDetails}>
                                    <div className={styles.cartItemTitle}>
                                        <h3>{item.name}</h3>
                                        <span className={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                    {Object.keys(groupedAttributes).map((key, index, arr) => {
                                        const selectedOption = groupedAttributes[key].find(attr => attr.selected) || groupedAttributes[key][0];
                                        const isLastAttribute = index === arr.length - 1;
                                        const kebabCaseKey = key.toLowerCase().replace(/ /g, '-');
                                        return (
                                            <div className={styles.cartItemAttribute} key={key}
                                                 style={{marginBottom: isLastAttribute ? 'auto' : ''}}
                                                 data-testid={`cart-item-attribute-${kebabCaseKey}`}>
                                                <label className={styles.labelTitle}>
                                                    {key}:
                                                    <div
                                                        className={key === "Color" ? styles.colorOptions : styles.attributeOptions}>
                                                        {groupedAttributes[key].map((option) => (
                                                            <span key={`${option.attribute_id}-${option.value}`}
                                                                  className={`${key === "Color" ? styles.colorSwatch : styles.attributeOption} ${selectedOption?.value === option.value ? styles.selected : ""}`}
                                                                  style={key === "Color" ? {backgroundColor: option.value} : {}}
                                                                  data-testid={`cart-item-attribute-${kebabCaseKey}-${option.display_value.replace(/ /g, '-')}${selectedOption?.value === option.value ? '-selected' : ''}`}>
                                                          {key !== "Color" && option.value}
                                                    </span>
                                                        ))}
                                                    </div>
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={styles.cartItemQuantity}>
                                    <button onClick={() => handleIncrement(item.id)}
                                            data-testid='cart-item-amount-increase'>+
                                    </button>
                                    <span data-testid='cart-item-amount'>{item.quantity}</span>
                                    <button onClick={() => handleDecrement(item.id)}
                                            data-testid='cart-item-amount-decrease'>-
                                    </button>
                                </div>
                                <img src={item.image} alt={item.name} className={styles.cartItemImage}/>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.cartFooter}>
                    <div className={styles.cartTotal} data-testid='cart-total'>
                        <span>Total</span>
                        <span
                            className={styles.cartTotalPrice}>{`${cartItems.length > 0 ? cartItems[0].currency : '$'} ${totalAmount}`}</span>
                    </div>
                    <button className={`${styles.placeOrderBtn} your-new-class`} disabled={cartItems.length === 0}
                            onClick={handlePlaceOrder} data-testid="place-order-btn">
                        PLACE ORDER
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartOverlay;
