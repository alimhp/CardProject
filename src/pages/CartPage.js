import { useCart, useCartActions } from "../Contex/CartProvider";
import Layout from "../layout/layout";
import "./CartPage.css";

const CartPage = () => {
  //we use{cart}insted of cartstate.cart
  //we distractur cart from it to have clean code
  const { cart } = useCart();
  const dispatch = useCartActions();
  if (!cart.length)
    return (
      <Layout>
        <main>
          <h2>cart is empty !</h2>
        </main>
      </Layout>
    );
  // console.log(cart);
  const incHandler = (cartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };
  const decHandler = (cartItem) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: cartItem });
  };
  return (
    <Layout>
      <main className="container">
        <section className="cartCenter">
          <section className="cartItemList">
            {cart.map((item) => {
              return (
                <div className="cartItem">
                  <div className="itemImage">
                    <img src={item.image} alt={item.name}></img>
                  </div>
                  <div>{item.name}</div>
                  <div>{item.price}$</div>
                  <div>{item.price * item.quantity}$</div>
                  <div>
                    <button onClick={() => incHandler(item)}>Add</button>
                    <button>{item.quantity}</button>
                    <button onClick={() => decHandler(item)}>remove</button>
                  </div>
                </div>
              );
            })}
          </section>
          <section className="cartSummery">cart summery</section>
        </section>
      </main>
    </Layout>
  );
};

// <main>
// {cart.length ? (
//     cart.map((item) => (
// <div key={item.id}>
//     <p>{item.name}</p>
// </div>
// ))
// ) : (
// <p>no item in cart !</p>
// )}
// </main>

export default CartPage;
