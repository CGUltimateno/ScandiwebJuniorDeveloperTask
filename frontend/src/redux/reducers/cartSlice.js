import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        total: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const product = state.items.find((i) => i.id === item.id);

            if (product) {
                product.qty += 1;
            } else {
                state.items.push({ ...item, qty: 1 });
            }

            state.total += item.price;
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            const item = action.payload;
            const product = state.items.find((i) => i.id === item.id);

            if (product.qty > 1) {
                product.qty -= 1;
            } else {
                state.items = state.items.filter((i) => i.id !== item.id);
            }

            state.total -= item.price;
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
    },
});

export const { addToCart, removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;