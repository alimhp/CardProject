import { useContext, useReducer, createContext } from "react";
import cartReducer from "./CartReducer";
const CartContext = createContext();
const CartContextDispatcher = createContext();
const initialstate = { cart: [], total: 0 };

const CartProvider = ({ children }) => {
  const [cart, Dispatch] = useReducer(cartReducer, initialstate);
  return (
    <CartContext.Provider value={cart}>
      <CartContextDispatcher.Provider value={Dispatch}>
        {children}
      </CartContextDispatcher.Provider>
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);
export const useCartActions = () => useContext(CartContextDispatcher);

// export const useCart = () => useContext(CartContext);
// export const useCartActions = () => useContext(CartContextDispatcher);
