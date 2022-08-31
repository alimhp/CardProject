import { NavLink } from "react-router-dom";
import { useCart } from "../../providers/CartProvider";
import { BsFillBasketFill } from "react-icons/bs";
import { AiTwotoneHome } from "react-icons/ai";
import "./Navigation.css";
import { useAuth } from "../../providers/AuthProvider";
const Navigation = () => {
  const { cart } = useCart();
  const userData = useAuth();
  return (
    <header className="mainNavigatin">
      <nav>
        <ul>
          <li>
            <NavLink to="/" activeClassName="activeLink" exact>
              <AiTwotoneHome />
            </NavLink>
          </li>
        </ul>
        <ul>
          <li className="cartLink">
            <NavLink to="/cart" activeClassName="activeLink">
              <BsFillBasketFill className="logocart" />
            </NavLink>
            <span className="cartlength">{cart.length}</span>
          </li>
          <li className="loginLink">
            <NavLink
              to={userData ? "/profile" : "/login"}
              activeClassName="activeLink"
            >
              {userData ? userData.name : " login / signup"}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
