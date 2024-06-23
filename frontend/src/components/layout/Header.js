import React, {useEffect, useState} from 'react';
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
    const { loading, error, data } = useQuery(GET_CATEGORIES);
    const location = useLocation();
    const [categoryId, setCategoryId] = useState(location.pathname.split('/')[1]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartItems = useSelector((state) => state.cart.items);
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        if (data) {
            dispatch(setCategories(data.categories));
        }
    }, [data, dispatch]);

    useEffect(() => {
        const currentCategoryId = location.pathname.split('/')[1];
        setCategoryId(currentCategoryId);
    }, [location]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <header className="header">
            <nav className="nav">
                {data.categories.map(({ id, name }) => (
                    <Link
                        key={id}
                        to={`/${id}`}
                        className={`nav-link ${id.toString() === categoryId ? 'active-link' : ''}`}
                        data-testid={id.toString() === categoryId ? 'active-category-link' : 'category-link'}
                    >
                        {name.toUpperCase()}
                    </Link>
                ))}
            </nav>
            <div className='logo-container'>
                <Link to='/1'>
                    <img src={logo} alt='logo' className="logo"/>
                </Link>
            </div>
            <div className="cart-container">
                <button className="cart-btn" onClick={() => setIsCartOpen(!isCartOpen)} data-testid="cart-btn">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                </button>
                {isCartOpen && <CartOverlay onClose={() => setIsCartOpen(false)} />}
            </div>
        </header>
    );
}

export default Header;
