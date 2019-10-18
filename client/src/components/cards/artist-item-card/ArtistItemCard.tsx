import React from 'react';

import { withStyles, WithStyles, createStyles } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';

import Photo from '@material-ui/icons/Photo';

import IArtistItemCardProps from './IArtistItemCardProps';

const styles = createStyles({
    'artist-avatar': {
        width: '100px',
        height: '100px',
        backgroundImage: (props: IArtistItemCardProps) => {
            return `url(${props.images.length ? props.images[0].url : ''})`
        },
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: '50%',
        margin: '5px'
    },
    'artist-avatar-placeholder-wrapper': {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        margin: '5px'
    },
    'artist-avatar-placeholder': {
        width: '100%',
        height: '100%'
    }
});

class ArtistItemCard extends React.PureComponent<IArtistItemCardProps & WithStyles<typeof styles>> {
    render() {
        const  artistAvatarMarkup = this.generateArtistAvatarMarkup();

        return (
            <Card raised={true} >
                <Box display="flex" flexDirection="row">
                    <Box display="flex" alignItems="center">
                        {artistAvatarMarkup}
                    </Box>
                    
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {this.props.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Popularity: {this.props.popularity} &bull; Followers: {this.props.followers.total}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            But are they Butt Rock? ...{this.props.isbuttrock ? 'Oh Yeah' : 'Nah'}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        );
    }
    
    private generateArtistAvatarMarkup() {
        const { classes } = this.props;

        let markup;

        if (this.props.images.length) {
            markup = (
                <div className={classes['artist-avatar']}>
                </div>
            );
        } else {
            markup = (
                <div className={classes['artist-avatar-placeholder-wrapper']}>
                    <Photo color="disabled" className={classes['artist-avatar-placeholder']} />
                </div>
            );
        }

        return markup;
    }
}

export default withStyles(styles)(ArtistItemCard);