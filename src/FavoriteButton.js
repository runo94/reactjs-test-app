import React, {Component, Fragment} from 'react'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';

const styles = theme => ({
    title: {
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        margin: '20px 0'
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
        background: ' linear-gradient(to right, rgba(235,233,249,1) 0%, rgba(235,233,249,1) 0%, rgba(206,199,236,.5) 57%, rgba(216,208,239,.3) 100%)',
        transition: 'all ease .5s',
        color: "#000",
        '&:hover': {
            background: ' linear-gradient(to left, rgba(235,233,249,1) 0%, rgba(235,233,249,1) 0%, rgba(206,199,236,1) 57%, rgba(216,208,239,1) 100%)',
            transition: 'all ease .5s',
        }
    },    
    titleText: {
        margin: 0
    }
});

class FavoriteButton extends Component {
    
    constructor(props){
        super(props);
        this.state={

        }
    };

    handleRemoveFavorite(movieId) {
        let filtered = this.props.favoritesList.filter(id=>id.id !== movieId);
        console.log(this.props);
        localStorage.setItem('favorite', JSON.stringify(filtered))
        this.props.handleChangeFavorites.bind(this, filtered)
        this.checkFavorite(filtered)
        this.setState({ state: this.state });
    }

    handleAddFavorite(movieId) {
        let arrayFav = []

        if(!this.props.favoritesList){
            console.log('this.props', this.props.movieId, movieId);
            arrayFav.push({id: this.props.movieInfo.id, title: this.props.movieInfo.title, release_date: this.props.movieInfo.release_date, overview: this.props.movieInfo.overview, poster: this.props.movieInfo.poster_path})
            localStorage.setItem('favorite', JSON.stringify(arrayFav));
        } else {
            arrayFav = this.props.favoritesList
            arrayFav.push({id: this.props.movieInfo.id, title: this.props.movieInfo.title, release_date: this.props.movieInfo.release_date, overview: this.props.movieInfo.overview, poster: this.props.movieInfo.poster_path})
            localStorage.setItem('favorite', JSON.stringify(arrayFav));
            this.props.handleChangeFavorites.bind(this)
            this.checkFavorite(arrayFav)    
            this.setState({ state: this.state });
        }
        
    }

    checkFavorite(favoritesList){
        if(favoritesList) {
            let finded = favoritesList.find(id=>id.id === this.props.movieId);
            if(finded) {
                console.log('FINDED!', this.props);
                return <Button onClick={this.handleRemoveFavorite.bind(this, this.props.movieInfo)} className={this.props.classes.buttonDeleteFavorite}>delete from favorite</Button>
            } else {
                console.log('NOT FIND!'); 
                return <Button onClick={this.handleAddFavorite.bind(this, this.props.movieInfo)} className={this.props.classes.buttonFavorite}>add to favorite</Button>
            }
        }
    }

    render() {        
        return (
            !!this.props.favoritesList ? this.checkFavorite(this.props.favoritesList) : 'loading...'
        )
    }
}

export default withStyles(styles)(FavoriteButton)

