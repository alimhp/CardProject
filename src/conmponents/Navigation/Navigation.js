import { NavLink } from "react-router-dom";
import { useCart } from "../../Contex/CartProvider";
import "./Navigation.css";
const Navigation = () => {
  const { cart } = useCart();
  return (
    <header className="mainNavigatin">
      <nav>
        <ul>
          <li>
            <NavLink to="/" activeClassName="activeLink" exact>
              Home
            </NavLink>
          </li>
          <li className="cartLink">
            <NavLink to="/cart" activeClassName="activeLink">
              Cart
              <span className="cartlength"> {cart.length}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
