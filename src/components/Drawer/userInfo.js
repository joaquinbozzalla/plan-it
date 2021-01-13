import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton, Menu, MenuItem, Avatar, } from '@material-ui/core';
import { signOut } from '../../actions';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        marginRight: '10px',
    },
    optionsButton: {
        color: '#fff',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
    },
    
}));

function UserInfo(props) {
    const classes = useStyles();
    const { signOut, profile, } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignout = () => {
        setAnchorEl(null);
        signOut();
    };

    return (
        <div className={classes.root}>
            <Avatar className={classes.avatar}>{profile && profile.name ? profile.name[0] : '-'}</Avatar>
            <IconButton className={classes.optionsButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleSignout}>Cerrar sesión</MenuItem>
            </Menu>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        profile: state.firebase.profile,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);