import {
    ADD_TO_CART,
    INCREMENT_ITEM,
    DECREMENT_ITEM,
    REMOVE_ITEM,
    CLEAR_CART,
} from '../actions/cartActions';

const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems')) || []
};

const cartReducer = (state = initialState, action) => {
    let newItems;

    switch (action.type) {
        case ADD_TO_CART:
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id && JSON.stringify(item.attributes) === JSON.stringify(action.payload.attributes)
            );
            if (existingItemIndex === -1) {
                newItems = [...state.items, action.payload];
                localStorage.setItem('cartItems', JSON.stringify(newItems));
                return {
                    ...state,
                    items: newItems
                };
            }
            return state;
        case INCREMENT_ITEM:
            newItems = state.items.map((item) =>
                item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
            );
            localStorage.setItem('cartItems', JSON.stringify(newItems));
            return {
                ...state,
                items: newItems
            };
        case DECREMENT_ITEM:
            newItems = state.items.map((item) =>
                item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
            ).filter((item) => item.quantity > 0);
            localStorage.setItem('cartItems', JSON.stringify(newItems));
            return {
                ...state,
                items: newItems
            };
        case REMOVE_ITEM:
            newItems = state.items.filter((item) => !(item.id === action.payload.id && JSON.stringify(item.attributes) === JSON.stringify(action.payload.attributes)));
            localStorage.setItem('cartItems', JSON.stringify(newItems));
            return {
                ...state,
                items: newItems
            };
        case CLEAR_CART:
            localStorage.removeItem('cartItems');
            return {
                ...state,
                items: []
            };

        default:
            return state;
    }
};

export default cartReducer;