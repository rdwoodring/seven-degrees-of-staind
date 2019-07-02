import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import IArtistItemCardProps from './IArtistItemCardProps';

class ArtistCardItem extends React.PureComponent<IArtistItemCardProps> {
    render() {
        return (
            <Card raised={true} >
                <Grid container>
                    <Grid item xs={2}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${this.props.images[0].url})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>

                        </div>
                    </Grid>
                    <Grid item xs={10}>
                        <CardContent>
                            <Typography variant="h4" component="h2">
                                {this.props.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                But are they Butt Rock? ...{this.props.isbuttrock ? 'Oh Yeah' : 'Nah'}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        );
    }
}

export default ArtistCardItem;