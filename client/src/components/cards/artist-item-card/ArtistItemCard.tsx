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
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Popularity: {this.props.popularity} &bull; Followers: {this.props.followers.total}
                        </Typography>
                        <Typography variant="body1">
                                Distance from Staind: {this.props.isbuttrock ? this.props.stepsAwayFromStaind: 'N/A'}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {this.generateButtRockClassification()}
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

    private generateButtRockClassification() {
        const stepsAwayFromStaind = this.props.stepsAwayFromStaind;

        if (stepsAwayFromStaind === null) {
            return `${this.props.name} isn't butt rock.`;
        } else if (stepsAwayFromStaind === 0) {
            return `${this.props.name} is the epicenter of butt rock.`;
        } else if (stepsAwayFromStaind > 0 && stepsAwayFromStaind <= 2) {
            return `${this.props.name} is quintessential butt rock.`;
        } else if (stepsAwayFromStaind > 2 && stepsAwayFromStaind <= 4) {
            return `Meh, ${this.props.name} is borderline butt rock.`;
        } else if (stepsAwayFromStaind > 4 && stepsAwayFromStaind <= 6) {
            return `${this.props.name} is, like, butt rock's third cousin, twice removed.`;
        }
    }
}

export default withStyles(styles)(ArtistItemCard);