import React, {Component,Fragment} from 'react'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { BrowserRouter as Router, Route, Redirect, Link, NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';

const styles = theme => ({
    movieNav: {
        width: '100%',
        height: 80,
        position: 'absolute',
        zIndex: 2,
        top: 80,
        background: 'rgba(0, 0, 0, .5)',
    },
    prevPage: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    nextPage: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    prevPageButton: {
        color: 'rgba(255, 255, 255, .5)',
        fontWeight: '300',
        width: '100%',
        textAlign: 'left',
        display: 'flex',
        justifyContent: 'flex-start',
        transition: 'all ease .5s',
        '&:hover': {
            color: 'rgba(255, 255, 255, 1)',
            transition: 'all ease .5s'
        }
    },
    nextPageButton: {
        color: 'rgba(255, 255, 255, .5)',
        fontWeight: '300',
        width: '100%',
        textAlign: 'right',
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'all ease .5s',
        textDecoration: 'none',
        '&:hover': {
            color: 'rgba(255, 255, 255, 1)',
            transition: 'all ease .5s'
        }
    }
});

class MovieNavigation extends Component {

    constructor(props) {
        super(props);
        this.state={

        }

        if(this.props.listIDs.length >= 19){
            let arrElements = this.props.listIDs;
            let currElement = !!arrElements && arrElements.indexOf(Number(this.props.movieId));

            this.setState({
                arrElements: arrElements,
                currElement: currElement
            })
            
        }
        this.goBack = this.goBack.bind(this);   
        console.log(this.state);
    }

    componentDidMount() {
        console.log(this.props.listIDs);
        if(this.props.listIDs.length >= 19){
            let arrElements = this.props.listIDs;
            let currElement = !!arrElements && arrElements.indexOf(Number(this.props.movieId));

            this.setState({
                arrElements: arrElements,
                currElement: currElement
            })
            
        }
    }

    goBack(){
        this.props.history.goBack();
    }

    goNext(id, arrElements, currElement, nextElement) {
        console.log('HIIIIIIIIIIII', this.props.movieId, id);
             
            if(currElement < arrElements.length - 1) {
                console.log('this.props.listIDs', this.props);              
                nextElement = currElement + 1

                if(nextElement === arrElements.length - 1) {
                    console.log('this.props.currPage', this.props.currPage);
                    this.props.pagesChange(this.props.currPage + 1)  
                }
            } else {                   
                console.log('this.props.listIDs', this.props.listIDs);
                let nextArrElements = this.props.listIDs;
                currElement = nextArrElements.indexOf(Number(id));
                nextElement = currElement
            }
            
            return this.props.history.push(`/movie/${arrElements[nextElement]}`)
    }

    render(){
        const { classes } = this.props;
        let arrElements = this.props.listIDs;
        let currElement = !!arrElements && arrElements.indexOf(Number(this.props.movieId));
        let nextElement = 0;
        

        return(
            <Fragment>
            <Grid item xs={6} className={classes.prevPage}>
                <Button onClick={this.goBack}  className={classes.prevPageButton}>
                    <Icon>navigate_before</Icon> Back
                </Button>
            </Grid>
             <Grid item xs={6} className={classes.nextPage}>
                <Button onClick={this.props.movieId ? this.props.movieDetails.bind(this, this.props.movieId) : undefined} className={classes.nextPageButton}>
                    <div onClick={this.props.listIDs ? this.goNext.bind(this, this.props.movieId, arrElements, currElement, nextElement) : undefined}  className={classes.nextPageButton}>
                        Next <Icon>navigate_next</Icon>
                    </div>
                </Button>
            </Grid>
            </Fragment>
        )
    }
}

export default withStyles(styles)(MovieNavigation)

