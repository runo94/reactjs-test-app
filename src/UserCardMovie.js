import React, {Component, Fragment} from 'react'

import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

const styles = theme => ({
    background: {
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        backgroundPositionX: 'center',
        backgroundPositionY: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        filter: 'blur(10px)',
        zIndex: '1',
        position:'relative',
        boxShadow: 'inset 0px 0px 32px 0px rgba(0,0,0,0.75)',
    },
    infoWrapper: {
        zIndex: "2",
        maxWidth: 1280,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 auto',
    },
    movieWrapper: {
        width: '100%',
        position: 'absolute',
        zIndex: 2,
        top: 80,
        background: 'rgba(0, 0, 0, .5)',
        minHeight: 'calc(100vh - 0px)'
    },
    moviePageWrapper: {
        overflow: 'hidden',
        background: '#000'
    },
    avatar: {
        display: 'flex',
        position:'relative',
        width: 180,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bigAvatar: {
        margin: 10,
        width: 180,
        height: 180,
    },
    cardFavoriteTexts: {
      color: '#fff'
    },
    active: {
        display: 'flex',
        background: 'transparent'
    },
    moviePoster: {
        width: 250,
        borderRadius: 10
    }
});

class UserCardMovie extends Component {

    
    render(){
        const { classes } = this.props;
        
        return(
            <Fragment>
            {
                this.props.favoritesList.map(favoriteItem => (                                 
                    <Grid container spacing={10}  className={classes.infoWrapper}>
                        <Grid item xs={12} md={3}>
                                <Link to={`/movie/${favoriteItem.id}`}>
                            <img src={`https://image.tmdb.org/t/p/w500/${favoriteItem.poster}`} className={classes.moviePoster}/>
                            </Link>
                        </Grid>
                        <Grid item xs={12} md={9} className={classes.cardFavoriteTexts}>
                            <h3>{favoriteItem.title}</h3>
                            <p>{favoriteItem.release_date}</p>
                            <p>{favoriteItem.overview}</p>
                        </Grid>            
                    </Grid>  
                ))                            
            }    
            </Fragment>
        )
    }
}

export default withStyles(styles)(UserCardMovie)
