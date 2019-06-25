import React from 'react';

import NavbarPresentation from './NavbarPresentation';

import INavbarProps from './INavbarProps';

class Navbar extends React.PureComponent<INavbarProps> {
    constructor(props: INavbarProps) {
        super(props);

        this.bindMethods();
    }

    bindMethods() {
        this.handleClickLoginLogoutButton = this.handleClickLoginLogoutButton.bind(this);
        
        return this;
    }

    render() {
        const navbarPresentationProps = {
                isLoggedIn: this.props.isLoggedIn,
                handleClickLoginLogoutButton: this.handleClickLoginLogoutButton
            };

        return (
            <>
                <NavbarPresentation {...navbarPresentationProps} />
            </>
        );
    }

    handleClickLoginLogoutButton() {
        if (this.props.isLoggedIn) {
            window.location.href = '/logout';
        } else {
            window.location.href = '/login';
        }
    }
}

export default Navbar;