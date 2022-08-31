import { Link } from "react-router-dom";
import { useCart } from "../../providers/CartProvider";
import { useAuth } from "../../providers/AuthProvider";
import "./checkout.css";
const Checkout = () => {
  const auth = useAuth();
  const { cart, total } = useCart();

  if (!cart.length)
    return (
      <main className="mainSection">
        <Link to="/">go to shopping !</Link>
      </main>
    );
  return (
    <main className="mainSection">
      <section className="checkoutSection">
        {auth ? (
          <>
            <section className="dataSection">
              <h3>Checkout Detail</h3>
              <p>name : {auth.name}</p>
              <p>email : {auth.email}</p>
              <p>phoneNumber : {auth.phoneNumber}</p>
            </section>
            <section className="cartSection">
              {cart &&
                cart.map((c) => {
                  return (
                    <div className="detailCart">
                      {c.name} * {c.quantity} : {c.quantity * c.offPrice}
                    </div>
                  );
                })}
              <div className="totalPrice">total price : {total}</div>
            </section>
          </>
        ) : (
          <p> please login ! </p>
        )}
      </section>
    </main>
  );
};

export default Checkout;
