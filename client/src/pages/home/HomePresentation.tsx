import React from 'react';

import IHomePresentationProps from './IHomePresentationProps';

import Navbar from '../../components/navbar/Navbar';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class HomePresentation extends React.Component<IHomePresentationProps> {
    render() {
        return (
            <>
                <Navbar/>
                <br />
                <div>
                    <Card raised={true}>
                        <CardHeader title={`Nothing "butt" rock!`} />
                        <CardContent>
                            <Typography variant="body1" gutterBottom>
                                Login with your Spotify account to search for your favorite artists and see if they're butt rock or not
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="large" variant="contained" color="primary" onClick={this.props.handleClickHeroLoginButton}>
                                Login to Spotify
                            </Button>
                        </CardActions>
                    </Card>
                </div>
                <br />
                <div>
                    <Grid container spacing={8} justify="center" xs={12}>
                        <Grid item xs={4}>
                            <Card raised={true}>
                                <CardHeader title={`Nothing "butt" rock!`} />
                                <CardContent>
                                    <Typography variant="body1" gutterBottom>
                                        Login with your Spotify account to search for your favorite artists and see if they're butt rock or not
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="large" variant="contained" color="primary">
                                        Login to Spotify
                                    </Button>
                                </CardActions>
                            </Card> 
                        </Grid>
                        <Grid item xs={4}>
                            <Card raised={true}>
                                <CardHeader title={`Nothing "butt" rock!`} />
                                <CardContent>
                                    <Typography variant="body1" gutterBottom>
                                        Login with your Spotify account to search for your favorite artists and see if they're butt rock or not
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="large" variant="contained" color="primary">
                                        Login to Spotify
                                    </Button>
                                </CardActions>
                            </Card> 
                        </Grid>
                        <Grid item xs={4}>
                            <Card raised={true}>
                                <CardHeader title={`Nothing "butt" rock!`} />
                                <CardContent>
                                    <Typography variant="body1" gutterBottom>
                                        Login with your Spotify account to search for your favorite artists and see if they're butt rock or not
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="large" variant="contained" color="primary">
                                        Login to Spotify
                                    </Button>
                                </CardActions>
                            </Card> 
                        </Grid>
                    </Grid>
                </div>
            </>
        );
    }
}

export default HomePresentation;