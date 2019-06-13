import React, {Component, Fragment} from 'react'

import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import UserCardMovie from './UserCardMovie';
import { Scrollbars } from 'react-custom-scrollbars';


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
        top: 80,
        background: 'rgba(0, 0, 0, .5)',
        minHeight: 'calc(100vh - 80px)'
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
    fab: {
      margin: theme.spacing(1),
      display: 'none',
      position:'absolute',
      margin: 0
    },
    active: {
        display: 'flex',
        background: 'transparent'
    },
    wrapperFavList: {
        height: 'calc(100vh - 260px)',
        overflowY: 'scroll'
    },
    userPageWrapper: {
        height: 'calc(100vh - 80px)',
        overflow:'hidden',
        background:'#000'
    },
    userInfoBlock: {
        color: "#fff"
    }
});

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeEditButton: false,
            favoritesList: null,
            backgroundUserProfile: null,
        }
    }

    componentDidMount(){
        if(!!localStorage.getItem("favorite")) {
            this.setState({
                favoritesList: JSON.parse(localStorage.getItem("favorite")),
                backgroundUserProfile: JSON.parse(localStorage.getItem("userProfileBackground"))
            })
        }
    }

    handleEditOpen(){
        this.setState({
            activeEditButton: true
        })
    }

    handleEditClose(){
        this.setState({
            activeEditButton: false
        })
    }

    handleBackground(e){
        localStorage.setItem('userProfileBackground', JSON.stringify(e.target.value));
        console.log('e.target.value', e.target.value);
    }

    handleSubmit(event) {
        this.setState({
            backgroundUserProfile: JSON.parse(localStorage.getItem("userProfileBackground"))
        })
      event.preventDefault();
    }

    render() {
        const { classes } = this.props;
        console.log(this.state);
        
        return (
            <div className={classes.userPageWrapper}>
                <div
                    style={{backgroundImage: "url(" + `${this.state.backgroundUserProfile}` + ")"}}
                    className={classes.background}
                >
                </div>
                <div className={classes.movieWrapper}>
                    <Grid container spacing={10} className={classes.infoWrapper}>
                        <Grid item xs={2}>
                            <div className={classes.avatar}>
                                <Avatar
                                    onMouseEnter={this.handleEditOpen.bind(this)}
                                    onMouseLeave={this.handleEditClose.bind(this)} 
                                    alt="Remy Sharp" 
                                    src="https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png" 
                                    className={classes.bigAvatar} 
                                />

                                <Fab 
                                    onMouseEnter={this.handleEditOpen.bind(this)}
                                    onMouseLeave={this.handleEditClose.bind(this)} 
                                    size="small" 
                                    color="secondary" 
                                    aria-label="Edit" 
                                    className={`${classes.fab} , ${this.state.activeEditButton ? classes.active : ''}`}
                                >
                                    <Icon>edit_icon</Icon>
                                </Fab>
                            </div>
                        </Grid>
                        <Grid item xs={5} className={classes.userInfoBlock}>
                            <p>Name: <strong>Hello</strong></p>
                            <p>Surname: <strong>World</strong></p>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <input type="text" onChange={this.handleBackground.bind(this)}  value={this.state.value}/>
                                <input type="submit" value="change background" />
                            </form>
                        </Grid>
                        <Grid item xs={5}>
                            
                        </Grid>
                    </Grid>
                    <Grid container >
                        <Scrollbars style={{ width: 1280, height: 'calc(100vh - 340px)', margin: '0 auto', background: 'linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)' }}>
                            {!!this.state.favoritesList ? <UserCardMovie favoritesList={this.state.favoritesList}/> : ''}
                        </Scrollbars>
                    </Grid> 
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(UserProfile)

