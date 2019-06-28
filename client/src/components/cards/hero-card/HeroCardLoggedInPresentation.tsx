import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Search from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
                    <TextField 
                        fullWidth={true}
                        value={this.props.search} 
                        onChange={this.props.handleChangeSearchField} 
                        onKeyUp={this.props.handleKeyUpSearchField}
                        margin="none" 
                        variant="outlined"
                        InputProps={{
                            style: {
                                boxSizing: 'border-box'
                            },
                            endAdornment: (
                                <IconButton aria-label="Search" color="primary" onClick={this.props.handleClickSearchButton} edge='end'>
                                    <Search />
                                </IconButton>
                            )
                        }}
                    />
                </CardActions>
            </Card>
        )
    }
}

export default HeroCardLoggedOutPresentation;