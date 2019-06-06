import React, {Component, Fragment} from 'react'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

const styles = theme => ({
    posterImage: {
        width: '100%',
    }
});

class MoviePoster extends Component {
    render(){
        const { classes } = this.props;
        
        return (
            <Grid 
                item 
                xs={6}
                md={4}
                lg={4}
            >
                <img 
                    className={classes.posterImage} 
                    src={`https://image.tmdb.org/t/p/w500/${this.props.poster}`} 
                />
            </Grid>
        )
    }
}

export default withStyles(styles)(MoviePoster)