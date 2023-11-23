import { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':

            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                return [...state, { ...action.payload, quantity: 1 }];
            } else {
                return [...state];
            }
        case "REMOVE_FROM_CART":
            return state.filter(item => item.id !== action.payload.id);

        default:
            return state;
    }
}

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};