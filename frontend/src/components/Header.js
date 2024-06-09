import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_CATEGORIES } from '../graphql/queries';
import './Header.css';

const Header = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    return (
      <header className="header">
        <nav className="nav">
        {data.categories.map(({ id, name }) => (
        <Link key={id} to={`/products/${id}`} className="nav-link">
          {name.toUpperCase()}
        </Link>
        ))}
        </nav>
        <div className='logo-container'>
          <img src="https://www.adidas.co.uk/glass/react/1.0.0/assets/logo.svg" alt="Adidas logo" className="logo" />
        </div>
        <div className="cart-container">
          <button className="cart-btn">Cart</button>
        </div>
      </header>
    );
}

export default Header;