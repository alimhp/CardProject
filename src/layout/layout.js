import Navigation from "../conmponents/Navigation/Navigation";

const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
