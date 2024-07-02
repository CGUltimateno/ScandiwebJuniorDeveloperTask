import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../redux/reducers/categorySlice';
import { GET_CATEGORIES } from '../../graphql/queries';
import './Header.css';
import logo from './logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartOverlay from './CartOverlay';

const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { loading, error, data } = useQuery(GET_CATEGORIES);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const cartItems = useSelector((state) => state.cart.items);
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        if (data) {
            dispatch(setCategories(data.categories));
        }
    }, [data, dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const pathName = location.pathname.split('/')[1];
    const activeCategoryName = pathName === '' ? data.categories[0].name.toLowerCase().replace(/ /g, '-') : pathName;

    return (
        <header className="header">
            <nav className="nav">
                {data.categories.map(({ id, name }) => (
                    <Link
                        key={id}
                        to={`/${name.toLowerCase().replace(/ /g, '-')}`}
                        className={`nav-link ${name.toLowerCase().replace(/ /g, '-') === activeCategoryName ? 'active-link' : ''}`}
                        data-testid={name.toLowerCase().replace(/ /g, '-') === activeCategoryName ? 'active-category-link' : 'category-link'}
                    >
                        {name.toUpperCase()}
                    </Link>
                ))}
            </nav>
            <div className='logo-container'>
                <Link to='/'>
                    <img src={logo} alt='logo' className="logo" />
                </Link>
            </div>
            <div className="cart-container">
                <button className="cart-btn" onClick={() => setIsCartOpen(!isCartOpen)} data-testid="cart-btn">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    {totalItems > 0 && <span className="cart-count" data-testid="cart-count-bubble">{totalItems}</span>}
                </button>
                {isCartOpen && <CartOverlay onClose={() => setIsCartOpen(false)} />}
            </div>
        </header>
    );
}

export default Header;
