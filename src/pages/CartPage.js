import { useCart } from "../Contex/CartProvider";
import Layout from "../layout/layout";

const CartPage = () => {
  const { cart } = useCart();
  // console.log(cart);
  return (
    <Layout>
      <main>
        {cart.length ? (
          cart.map((item) => <div key={item.id}>{item.name}</div>)
        ) : (
          <p>no item in cart !...</p>
        )}
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
