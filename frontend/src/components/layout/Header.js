import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCategories } from '../../redux/reducers/categorySlice';
import { GET_CATEGORIES } from '../../graphql/queries';
import './Header.css';

const Header = () => {
    const dispatch = useDispatch();
    const { loading, error, data } = useQuery(GET_CATEGORIES);
    const location = useLocation();
    const [categoryId, setCategoryId] = useState(location.pathname.split('/')[1]);

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
                <img src="https://www.adidas.co.uk/glass/react/1.0.0/assets/logo.svg" alt="Adidas logo" className="logo" />
            </div>
            <div className="cart-container">
                <button className="cart-btn">Cart</button>
            </div>
        </header>
    );
}

export default Header;
