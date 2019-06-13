import React, {Component,Fragment} from 'react'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MoviePoster from './MoviePoster';
import MovieInformation from './MovieInformation'
import MovieNavigation from './MovieNavigation'

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
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 auto',
    },
    movieWrapper: {
        width: '100%',
        position: 'absolute',
        zIndex: 2,
        top: 160,
        background: 'rgba(0, 0, 0, .5)',
        minHeight: 'calc(100vh - 80px)'
    },
    moviePageWrapper: {
        overflow: 'hidden',
        background: '#000'
    },
    movieNav: {
        width: '100%',
        height: 80,
        position: 'absolute',
        zIndex: 2,
        top: 80,
        background: 'rgba(0, 0, 0, .5)',
    },
});

class MoviePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }   
        this.goBack = this.goBack.bind(this);
    }

    getMovieDetails = (movieId) => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    //'Content-Type': 'application/json'
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" // otherwise $_POST is empty
                },
            })
            .then(response => response.json())
            .then(json => {           
                this.setState({
                    data: json,
                })
            })
    }

    goBack(){
        this.props.history.goBack();
        this.getMovieDetails(this.props.history.location.pathname.slice(7))
        console.log('WORK!!!!!!!!!!!!!!!!!', this.props.history.location.pathname.slice(7));        
    }

    componentDidMount() {
       !!this.props.match.params.id && this.getMovieDetails(this.props.match.params.id);  
    }

    render(){
        const { classes } = this.props;
        
        return(
            <div className={classes.moviePageWrapper}>
                <div
                    style={{backgroundImage: "url(" + `https://image.tmdb.org/t/p/w500/${!!this.state.data && this.state.data.backdrop_path}` + ")"}}
                    className={classes.background}
                >
                </div>
                <Grid container className={classes.movieNav}>
                    {
                        !!this.props.listIDs ? <MovieNavigation history={this.props.history} listIDs={this.props.listIDs} pageChange={this.props.pagesChange} movieDetails={this.getMovieDetails} movieId={this.props.match.params.id} currPage={this.props.currPage} back={this.goBack}/> : 'Loading...'
                    }
                </Grid>
                <div className={classes.movieWrapper}>
                    <Grid container spacing={10} className={classes.infoWrapper}>
                        {
                            !!this.state.data ? <MoviePoster poster={this.state.data.poster_path} /> : 'Loading...'
                        }
                        {
                            !!this.state.data ? <MovieInformation movieInfo={this.state.data} /> : 'Loading...'
                        }
                    </Grid>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(MoviePage)