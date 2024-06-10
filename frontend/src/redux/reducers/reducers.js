import { combineReducers } from "redux";
import cartReducer from "./cartSlice";
import categoryReducer from "./categorySlice";

const rootReducer = combineReducers({
    cart: cartReducer,
    category: categoryReducer,
    });

export default rootReducer;