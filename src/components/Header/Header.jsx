import React from 'react';
import './Header.scss';

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <h1 className="logo">Filmzy</h1>
            </div>
            <hr className="separator" />
        </header>
    );
};

export default Header;
