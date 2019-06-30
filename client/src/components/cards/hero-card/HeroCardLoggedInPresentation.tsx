import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import SearchWithButton from '../../searches/search-with-button/SearchWithButton';

import IHeroCardPresentationProps from './IHeroCardPresentationProps';

class HeroCardLoggedOutPresentation extends React.Component<IHeroCardPresentationProps> {
    render() {
        return (
            <Card raised={true}>
                <CardHeader title={`Nothing "butt" rock!`} />
                <CardContent>
                    <Typography variant="body1" gutterBottom>
                        Search for your favorite artist to see how deep they are in the crack
                    </Typography>
                </CardContent>
                <CardActions>
                    <SearchWithButton 
                        search={this.props.search}
                        handleChangeSearchField={this.props.handleChangeSearchField}
                        handleKeyUpSearchField={this.props.handleKeyUpSearchField}
                    />
                </CardActions>
            </Card>
        )
    }
}

export default HeroCardLoggedOutPresentation;