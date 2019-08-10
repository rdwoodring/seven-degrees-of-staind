import React from 'react';

import IHomePresentationProps from './IHomePresentationProps';

import withLoggedIn from '../../HOCs/withIsLoggedIn/withIsLoggedIn';

import HeroCard from '../../components/cards/hero-card/HeroCard';

import { withStyles, WithStyles, createStyles } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const WrappedHeroCard = withLoggedIn(HeroCard),
    styles = createStyles({
        'butt-rock-info-card': {
            height: '100%'
        }
    });

class HomePresentation extends React.Component<IHomePresentationProps & WithStyles<typeof styles>> {
    render() {
        const { classes } = this.props;

        return (
            <>
                <Grid container spacing={2} justify="center" alignContent="center">
                    <Grid item xs={12}>
                        <WrappedHeroCard />
                    </Grid>
                    <Grid item xs={4}>
                        <Card raised={true} className={classes['butt-rock-info-card']}>
                            <CardHeader title={`What?! What the hell is "butt rock"?`} titleTypographyProps={{
                                variant: 'h6',
                                component: 'h5'
                            }} />
                            <CardContent>
                                <Typography variant="body1" gutterBottom>
                                    C'mon, you know! <Link href="https://www.urbandictionary.com/define.php?term=Butt%20Rock" color="primary" variant="body1" target="_blank" rel="noopener noreferrer">Butt Rock!</Link> It's like Staind and Nickelback and Creed... and... and... Did I mention Staind already?
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card raised={true} className={classes['butt-rock-info-card']}>
                            <CardHeader title={`What's the deal with the "7 Degrees" stuff?`} titleTypographyProps={{
                                variant: 'h6',
                                component: 'h5'
                            }} />
                            <CardContent>
                                <Typography variant="body1" gutterBottom>
                                    I was going for&nbsp;
                                    <Link href="https://en.wikipedia.org/wiki/Six_Degrees_of_Kevin_Bacon" color="primary" variant="body1" target="_blank" rel="noopener noreferrer">
                                        6 Degrees of Kevin Bacon
                                    </Link>
                                    &nbsp;except I screwed up the number and never bothered to fix it. Anywho, the app uses the Spotify Related Artists API to check out Staind's related artists and their related artists and so on.
                                </Typography>
                            </CardContent>
                        </Card> 
                    </Grid>
                    <Grid item xs={4}>
                        <Card raised={true} className={classes['butt-rock-info-card']}>
                            <CardHeader title={`Why are you so obsessed with Staind?`} titleTypographyProps={{
                                variant: 'h6',
                                component: 'h5'
                            }} />
                            <CardContent>
                                <Typography variant="body1" gutterBottom>
                                    'Cause they're the epicenter of butt rock. And also, I got tired of debating with my friends which artists were butt rock and which weren't.
                                </Typography>
                            </CardContent>
                        </Card> 
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default withStyles(styles)(HomePresentation);