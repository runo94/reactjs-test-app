import React, {Component, Fragment} from 'react'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import FavoriteButton from './FavoriteButton'

const styles = theme => ({
    title: {
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        margin: '20px 0'
    },
    movieDetails: {
        color: '#fff',
        borderRight: '1px solid rgba(255,255,255, .3)',
        padding: '0 0 0 10px'
    },
    movieDescription: {
        color: '#fff',
        padding: '15px 0',
        margin: '15px 0',
        borderTop: '1px solid rgba(255,255,255, .3)',
        borderBottom: '1px solid rgba(255,255,255, .3)',
    },
    movieSite:{
        listStyle: "none",
        borderRadius: 4,
        minWidth: 20,
        textAlign: 'center',
        margin: 4,
        transition: 'all ease .5s',
        boxShadow: '0px 0px 18px -6px rgba(0,0,0,0.25)',
        background: 'linear-gradient(135deg, rgba(241,231,103,1) 0%, rgba(254,182,69,1) 100%)',
        textDecoration: 'none',
        color: '#553026',
        padding: 10,
        fontWeight: '500',
        '&:hover': {
            background: 'linear-gradient(to bottom, rgba(241,231,103,1) 0%, rgba(254,182,69,1) 100%)',
            color: "#fff",
            transition: 'all ease .5s',
        }
    },
    buttonFavorite: {
        background: 'linear-gradient(to right, rgba(210,255,82,1) 0%, rgba(145,232,66,0.43) 100%)',
        transition: 'all ease .5s',
        color: "#000",
        '&:hover': {
            background: 'linear-gradient(to right, rgba(210,255,82,1) 0%, rgba(145,232,66,0.9) 100%)',
            transition: 'all ease .5s',
        }
    },
    buttonDeleteFavorite: {
        background: 'ms-linear-gradient(to left, rgba(235,233,249,1) 0%, rgba(235,233,249,1) 0%, rgba(206,199,236,1) 57%, ',
        transition: 'all ease .5s',
        color: "#000",
        '&:hover': {
            background: 'ms-linear-gradient(to right, rgba(235,233,249,1) 0%, rgba(235,233,249,1) 0%, rgba(206,199,236,1) 57%, ',
            transition: 'all ease .5s',
        }
    },    
    titleText: {
        margin: 0
    }
});

class MovieInformation extends Component {

    constructor(props){
        super(props);
        this.state = {
            favorites: null,
            curFavoriteId: null
        }
    }

    componentDidMount(){
        if(!!localStorage.getItem("favorite")){
            this.setState({
                favorites: JSON.parse(localStorage.getItem("favorite")),
            })
        } else {
            this.setState({
                favorites: []
            })
        }
    }

    handleChangeFavorites(favoriteUpdated) {
        if(!!localStorage.getItem("favorite")){
            console.log('favorites: JSON.parse(localStorage.getItem("favorite"))', JSON.parse(localStorage.getItem("favorite")));
            this.setState({
                favorites: JSON.parse(localStorage.getItem("favorite")),
            })
        }
        console.log('favorites: JSON.parse(localStorage.getItem("favorite"))', JSON.parse(localStorage.getItem("favorite")));

        if(favoriteUpdated) {
            this.setState({
                favorites: favoriteUpdated,
            })
        }
    }
    
    render(){
        const { classes } = this.props;
        console.log('state favorite', this.state.favorites);
        
        return(
            <Grid
                item 
                xs={5}
                md={7}
                lg={7}
            >
                <Grid container className={classes.title}>
                    <Grid
                        item 
                        xs={9}
                        md={9}
                        lg={9}
                    >
                        <h1 className={classes.titleText}>{this.props.movieInfo.title} ({this.props.movieInfo.release_date.slice(0,-6)})</h1>
                    </Grid>
                    <Grid
                        item 
                        xs={3}
                        md={3}
                        lg={3}
                        className={classes.title}
                    >
                        {
                          <FavoriteButton movieId={this.props.movieInfo.id} favoritesList={this.state.favorites} movieInfo={this.props.movieInfo} handleChangeFavorites={this.handleChangeFavorites}/>
                        }
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid
                        item 
                        xs={12}
                        md={3}
                        lg={3}
                        className={classes.movieDetails}
                    >
                        <p>
                            Score: {this.props.movieInfo.vote_average}
                        </p>
                    </Grid>
                    <Grid
                        item 
                        xs={12}
                        md={3}
                        lg={3}
                        className={classes.movieDetails}
                    >
                        <p>
                            Rating: {this.props.movieInfo.adult}
                        </p>
                    </Grid>
                    <Grid
                        item 
                        xs={12}
                        md={6}
                        lg={6}
                        className={classes.movieDetails}
                    >
                        <p>
                            Release Date: {this.props.movieInfo.release_date}
                        </p>
                    </Grid>
                </Grid>
                <Grid
                    container 
                    className={classes.movieDescription}
                >
                    <p>
                        {this.props.movieInfo.overview}
                    </p>
                </Grid>
                <Grid
                    container 
                >
                    <a className={classes.movieSite} href={this.props.movieInfo.homepage}>Movie Home Page</a>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(MovieInformation)