import React from 'react';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <nav className="nav">
          <a href="/" className="nav-link active">ALL</a>
          <a href="/" className="nav-link">TECH</a>
          <a href="/" className="nav-link">CLOTHES</a>
        </nav>
        <div className="cart-container">
          <button className="currency-btn">Currency</button>
          <button className="cart-btn">Cart</button>
        </div>
      </header>
    );
  }
}

export default Header;
