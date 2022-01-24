import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/horizontal-color.svg';

const Layout = () => (
  <div className="App-container">
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="Logo" />
      </Link>
    </div>
    <Outlet />
  </div>
);

export default Layout;
