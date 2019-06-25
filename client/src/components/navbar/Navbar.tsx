import React from 'react';

import NavbarPresentation from './NavbarPresentation';

import INavbarProps from './INavbarProps';

class Navbar extends React.PureComponent<INavbarProps> {
    render() {
        const navbarPresentationProps = {
                isLoggedIn: this.props.isLoggedIn
            };

        return (
            <>
                <NavbarPresentation {...navbarPresentationProps} />
            </>
        );
    }
}

export default Navbar;