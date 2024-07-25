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
            if (existingItemIndex !== -1) {
                // Increment the quantity of the existing item
                newItems = state.items.map((item, index) =>
                    index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Add new item to the cart
                newItems = [...state.items, action.payload];
            }
            break;
        case INCREMENT_ITEM:
            newItems = state.items.map((item) =>
                item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
            );
            break;
        case DECREMENT_ITEM:
            newItems = state.items.map((item) =>
                item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
            ).filter((item) => item.quantity > 0);
            break;
        case REMOVE_ITEM:
            newItems = state.items.filter((item) => !(item.id === action.payload.id && JSON.stringify(item.attributes) === JSON.stringify(action.payload.attributes)));
            break;
        case CLEAR_CART:
            newItems = [];
            break;
        default:
            newItems = state.items;
            break;
    }

    localStorage.setItem('cartItems', JSON.stringify(newItems));
    return {
        ...state,
        items: newItems
    };
};

export default cartReducer;
