import React, {Component, Fragment} from 'react'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

const styles = theme => ({
});

class UserMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
        };
    }

    handleClick(event) {
        console.log('CLICK',event);
        
        this.setState({ 
            anchorEl: event.currentTarget,
        });
    }
  
    handleClose() {
        this.setState({ 
            anchorEl: null,
        });
    }

    render(){
        const { anchorEl } = this.state;
        return(
            <Fragment>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick.bind(this)}>
                    <Icon>arrow_drop_down_circle</Icon>
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose.bind(this)}
                >
                    <MenuItem onClick={this.handleClose.bind(this)}>
                        <Link to={'/user-profile/'}>My account</Link>
                    </MenuItem>
                </Menu>
            </Fragment>
        )
    }
}

export default withStyles(styles)(UserMenu)