export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREMENT_ITEM = 'INCREMENT_ITEM';
export const DECREMENT_ITEM = 'DECREMENT_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CLEAR_CART = 'CLEAR_CART';

export const CREATE_ORDER = 'CREATE_ORDER';

export const addToCart = (item) => ({
    type: ADD_TO_CART,
    payload: item
});

export const incrementItem = (id) => ({
    type: INCREMENT_ITEM,
    payload: id
});

export const decrementItem = (id) => ({
    type: DECREMENT_ITEM,
    payload: id
});

export const removeItem = (id) => ({
    type: REMOVE_ITEM,
    payload: id
});

export const clearCart = () => ({
    type: CLEAR_CART
});