import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import CartProvider from "./providers/CartProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage";
import AuthProvider from "./providers/AuthProvider";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ToastContainer />
          <Switch>
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/Login" component={LoginPage} />
            <Route path="/signup" component={SigninPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
