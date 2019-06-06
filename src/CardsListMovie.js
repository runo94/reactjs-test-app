import React from 'react';
import CardMovie from './CardMovie';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Pagination from "react-js-pagination";

const styles = theme => ({
    root: {
        maxWidth: 1280,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 auto'
    },
    pagination: {
        display: "flex",
        justifyContent: 'center'
    },
    pageNum: {
        listStyle: "none",
        border: '2px solid #ececec',
        borderRadius: 6,
        minWidth: 20,
        textAlign: 'center',
        margin: 4,
        transition: 'all ease .3s',
        boxShadow: '0px 0px 18px -6px rgba(0,0,0,0.25)',
        '&:hover': {            
            border: 'rgba(0 0 0 0)',
            transition: 'all ease .3s',
            background: 'linear-gradient(135deg, rgba(179,220,237,1) 0%, rgba(41,184,229,1) 50%, rgba(188,224,238,1) 100%)',
            color: "#fff"
        }
    },
    activePageNum: {
        border: 'rgba(0 0 0 0)',
        background: 'linear-gradient(135deg, rgba(179,220,237,1) 0%, rgba(41,184,229,1) 50%, rgba(188,224,238,1) 100%)',
        color: "#fff"
    },
    pageLink: {
        textDecoration: 'none',
        color: '#5a5a5a',
        padding: 5,
        display:'block',
        minWidth: 20,
        '&:hover': {
            color: "#fff"
        }
    },
    activePageLink: {
        color: "#fff"
    },
    disabledPage: {
        background: '#ececec !important',
        '&:hover': {
            border: '2px solid #ececec',
            background: '#ececec',
            color: '#cecece !important'
        }
    },
    firstPage: {
        background: 'linear-gradient(135deg, rgba(241,231,103,1) 0%, rgba(254,182,69,1) 100%)',
        '&:hover': {
            border: '2px solid #ececec',
            background: 'linear-gradient(to bottom, rgba(241,231,103,1) 0%, rgba(254,182,69,1) 100%)',
            color: '#cecece !important'
        }

    },
    prevPage: {
        background: 'linear-gradient(135deg, rgba(241,231,103,1) 0%, rgba(254,182,69,1) 100%)',
        '&:hover': {
            border: '2px solid #ececec',
            background: 'linear-gradient(to bottom, rgba(241,231,103,1) 0%, rgba(254,182,69,1) 100%)',
            color: '#cecece !important'
        }

    },
    nextPage: {
        background: 'linear-gradient(135deg, rgba(241,231,103,1) 0%, rgba(254,182,69,1) 100%)',
        '&:hover': {
            border: '2px solid #ececec',
            background: 'linear-gradient(to bottom, rgba(241,231,103,1) 0%, rgba(254,182,69,1) 100%)',
            color: '#cecece !important'
        }

    },
    lastPage: {
        background: 'linear-gradient(135deg, rgba(241,231,103,1) 0%, rgba(254,182,69,1) 100%)',
        '&:hover': {
            border: '2px solid #ececec',
            background: 'linear-gradient(to bottom, rgba(241,231,103,1) 0%, rgba(254,182,69,1) 100%)',
            color: '#cecece !important'
        }

    }
});

class CardsListMovie extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            spacing: '5',
        }
    }

    handlePageChange(pageNumber) {
        this.setState({page: pageNumber});
        this.props.pagesChange(pageNumber);
    }

    render(){
        const { classes } = this.props;
        console.log('PROOOOOPS CardsLIstMovies', this.props);
               
        return (
            <div>
                <div className={classes.root}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <h3>Latest Realeases</h3>
                        </Grid>
                        {
                            !!this.props.moviesList ? <CardMovie movieInfo={this.props.moviesList.results}/> : 'Loading...'
                        }
                    </Grid>
                </div>
                <Pagination
                    prevPageText='prev'
                    nextPageText='next'
                    firstPageText='first'
                    lastPageText='last'
                    activePage={this.props.pageNumber}
                    itemsCountPerPage={20}
                    totalItemsCount={this.props.totalCount}
                    onChange={this.handlePageChange.bind(this)}
                    itemClass={classes.pageNum}
                    innerClass={classes.pagination}
                    linkClass={classes.pageLink}
                    activeClass={classes.activePageNum}
                    activeLinkClass={classes.activePageLink}
                    disabledClass={classes.disabledPage}
                    itemClassFirst={classes.firstPage}
                    itemClassPrev={classes.prevPage}
                    itemClassNext={classes.nextPage}
                    itemClassLast={classes.lastPage}
                />
            </div>
        )
    }
}

export default withStyles(styles)(CardsListMovie);