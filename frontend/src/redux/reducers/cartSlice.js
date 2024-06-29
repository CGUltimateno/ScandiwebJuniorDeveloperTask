import {
    ADD_TO_CART,
    INCREMENT_ITEM,
    DECREMENT_ITEM,
    REMOVE_ITEM, CLEAR_CART,
} from '../actions/cartActions';

const initialState = {
    items: []
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id && JSON.stringify(item.attributes) === JSON.stringify(action.payload.attributes)
            );
            if (existingItemIndex >= 0) {
                const newItems = [...state.items];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: newItems[existingItemIndex].quantity + 1
                };
                return {
                    ...state,
                    items: newItems
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, action.payload]
                };
            }
        case INCREMENT_ITEM:
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                )
            };
        case DECREMENT_ITEM:
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
                )
            };
        case REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload)
            };
        case CLEAR_CART:
            return {
                ...state,
                items: []
            };

        default:
            return state;
    }
};

export default cartReducer;
