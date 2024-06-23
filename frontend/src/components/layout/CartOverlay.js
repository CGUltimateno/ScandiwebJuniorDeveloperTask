import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementItem, decrementItem, removeItem } from '../../redux/actions/cartActions';
import './CartOverlay.css';

const CartOverlay = ({ onClose }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

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

    return (
        <div className="cart-overlay">
            <div className="cart-header">
                <h2>My Bag, {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</h2>
                <button onClick={onClose} className="close-btn">&times;</button>
            </div>
            <div className="cart-items">
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <div className="cart-item-attribute">
                                <span>Size: {item.size}</span>
                            </div>
                            <div className="cart-item-attribute">
                                <span>Color: <span style={{ backgroundColor: item.color }} className="color-swatch"></span></span>
                            </div>
                            <div className="cart-item-quantity">
                                <button onClick={() => handleDecrement(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleIncrement(item.id)}>+</button>
                            </div>
                        </div>
                        <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="cart-footer">
                <div className="cart-total">
                    <span>Total</span>
                    <span className="cart-total-price">${totalAmount}</span>
                </div>
                <button className="place-order-btn" disabled={cartItems.length === 0}>
                    PLACE ORDER
                </button>
            </div>
        </div>
    );
};

export default CartOverlay;
