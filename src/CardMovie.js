import React, {Fragment} from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    itemWrapp: {
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
    },
    itemImg: {
        width: 292,
        height: 388,
        textAlign: 'center',
        boxShadow: '0px 0px 18px -6px rgba(0,0,0,0.75)',
        transition: 'all ease .3s',
        backgroundPositionX: 'center',
        backgroundPositionY: 'center',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        cursor: 'pointer',
        '&:hover': {
            transition: 'all ease .3s',
            backgroundSize: '150%',
            boxShadow: '0px 0px 18px -6px rgba(0,0,0,1)',
        }
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
});

class CardMovie extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            movieTitle: null,
        };
    }
    
    
    handlePopoverOpen(event, title) {        
        this.setState({ 
            anchorEl: event.currentTarget,
            movieTitle: title,
        });
    };
    
    handlePopoverClose = () => {
        this.setState({ 
            anchorEl: null,
            movieTitle:  null 
        });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            
            <Fragment>
                {
                    this.props.movieInfo.map(movie => {
                        return ( 
                            <Grid 
                                item 
                                xs={12} 
                                lg={3} 
                                sm={6} 
                                md={4} 
                                xl={3} 
                                className={classes.itemWrapp} 
                                key={movie.img}
                                
                            >
                                <Link to={`/movie/${movie.id}`}>
                                    <div 
                                        aria-owns={open ? 'mouse-over-popover' : undefined}
                                        aria-haspopup="true"
                                        onMouseEnter={(e) => this.handlePopoverOpen(e, movie.title) }
                                        onMouseLeave={this.handlePopoverClose.bind(this)} 
                                        className={classes.itemImg} 
                                        style={{backgroundImage: "url(" + `https://image.tmdb.org/t/p/w500/${movie.poster_path}` + ")"}}
                                    ></div> 
                                </Link>
                            </Grid>
                        )
                    })
                }
                <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                        paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    onClose={this.handlePopoverClose}
                    disableRestoreFocus
                    >
                        <Typography>{this.state.movieTitle}</Typography>
                </Popover>    
            </Fragment>
        )
    }    
}

CardMovie.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardMovie);