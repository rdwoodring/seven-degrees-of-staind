import React from 'react';

import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import HeroCardLoggedInPresentation from './HeroCardLoggedInPresentation';
import HeroCardLoggedOutPresentation from './HeroCardLoggedOutPresentation';

import IHeroCardProps from './IHeroCardProps';
import IHeroCardState from './IHeroCardState'

class HeroCard extends React.Component<IHeroCardProps & RouteComponentProps, IHeroCardState> {
    state: IHeroCardState;

    constructor(props: IHeroCardProps & RouteComponentProps) {
        super(props);

        this.state = {
            search: ''
        };

        this.handleClickLoginButton = this.handleClickLoginButton.bind(this);
        this.handleClickSearchButton = this.handleClickSearchButton.bind(this);
        this.handleChangeSearchField = this.handleChangeSearchField.bind(this);
        this.handleKeyUpSearchField = this.handleKeyUpSearchField.bind(this);
    }
    render() {
        const HeroCardPresentation: React.ElementType = this.selectHeroCardPresentation();

        return (
            <HeroCardPresentation
                search={this.state.search}
                handleClickLoginButton={this.handleClickLoginButton}
                handleClickSearchButton={this.handleClickSearchButton}
                handleChangeSearchField={this.handleChangeSearchField}
                handleKeyUpSearchField={this.handleKeyUpSearchField}
            />
        );
    }

    handleClickLoginButton() {
        window.location.href = '/login';
    }

    handleClickSearchButton() {
        this.props.history.push(`/search?artist=${this.state.search}`);
    }

    handleChangeSearchField(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            search: e.target.value
        });
    }

    handleKeyUpSearchField(e: React.KeyboardEvent<HTMLInputElement>) {
        const enterKeyCode = 13;
        
        if (e.keyCode === enterKeyCode) {
            this.handleClickSearchButton();
        }
    }

    selectHeroCardPresentation() {
        if (this.props.isLoggedIn) {
            return HeroCardLoggedInPresentation;
        } else {
            return HeroCardLoggedOutPresentation;
        }
    }
}

export default withRouter(HeroCard);