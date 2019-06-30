import React from 'react';

import Search from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import ISearchWithButtonProps from './ISearchWithButtonProps';

class SearchWithButton extends React.PureComponent<ISearchWithButtonProps> {
    render() {
        return (
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
        )
    }
}

export default SearchWithButton;