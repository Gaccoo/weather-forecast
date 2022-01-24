import { Link } from 'react-router-dom';
import logo from '../assets/horizontal-color.svg';

const Home = () => (
  <div className="home">
    <Link to="/weather-forecast">
      <img className="home-logo" src={logo} alt="Logo" />
    </Link>
  </div>
);

export default Home;
