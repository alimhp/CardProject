import Layout from "../layout/layout";
import * as data from "../conmponents/data";
import { useCart, useCartActions } from "../Contex/CartProvider";
import { toast } from "react-toastify";
import { checkInCart } from "../utils/checkInCart";

const HomePage = () => {

  const { cart } = useCart();
  const dispatch = useCartActions();

  
  const addProductHandler = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} added to cart !`);
  };

  return (
    <Layout>
      <main className="container">
        <section className="productList">
          {data.products.map((product) => {
            return (
              <section className="product" key={product.id}>
                <div className="productImg">
                  <img src={product.image} alt={product.name}></img>
                </div>
                <div className="productDesc">
                  <p>{product.name}</p>
                  <p>$ {product.price}</p>
                  <button
                    onClick={() => addProductHandler(product)}
                    className="btn primary"
                  >
                    {checkInCart(cart, product) ? "in Cart" : "add to Cart"}
                  </button>
                </div>
              </section>
            );
          })}
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;
{
}
