const initialState = {
    items: [],
    total: 0,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':

            return state;
        case 'REMOVE_FROM_CART':
            // Logic for removing from cart
            return state;
        case 'UPDATE_CART_TOTAL':
            // Logic for updating cart total
            return state;
        default:
            return state;
    }
};

export default cartReducer;
