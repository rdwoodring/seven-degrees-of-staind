import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import IHeroCardPresentationProps from './IHeroCardPresentationProps';

class HeroCardLoggedOutPresentation extends React.Component<IHeroCardPresentationProps> {
    render() {
        return (
            <Card raised={true}>
                <CardHeader title={`Nothing "butt" rock!`} />
                <CardContent>
                    <Typography variant="body1" gutterBottom>
                        Login with your Spotify account to search for your favorite artists and see if they're butt rock or not
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large" variant="contained" color="primary" onClick={() => {console.log('hi')}}>
                        Login to Spotify
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

export default HeroCardLoggedOutPresentation;