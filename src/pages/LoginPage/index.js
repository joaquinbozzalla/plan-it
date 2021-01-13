import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, } from '@material-ui/core';
import { connect } from 'react-redux';
import { switchSignForm } from '../../actions';
import Signin from '../../components/Forms/Signin';
import Signup from '../../components/Forms/Signup';
import ForgetPassword from '../../components/Forms/ForgetPassword';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        width: '100%',
        height: window.innerHeight + 'px',
    },
    infoContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(to right, #BF05F2, #110273) no-repeat 0 0 / cover',
        height: window.innerHeight + 'px',
    },
    textField: {
        width: '100%',
        margin: '10px',
    },
    welcomeTitle: {
        color: '#fff',
        marginBottom: '50px',
    },
    signUpButton: {
        color: '#fff',
        borderRadius: '20px',
        border: 'solid 1px #fff',
        background: 'rgba(0, 0, 0, 0)',
        height: '40px',
        width: '50%',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.2)',
        },
    },
}));

function LoginPage(props) {
    const classes = useStyles();
    const { currentForm, switchSignForm } = props;

    const getCurrentForm = (index) => {
        switch (index) {
            case 0:
                return <Signin />;
            case 1:
                return <Signup />;
            case 2:
                return <ForgetPassword />;
            default:
                break;
        }

    }

    return (
        <Grid className={classes.mainContainer} container justify="center" alignItems="center">
            <Grid className={classes.infoContainer} item xs={12} md={6}>
                <Typography variant="h1" component="h1" className={classes.welcomeTitle}>plan it!</Typography>
                {
                    currentForm === 0
                    ? <Button className={classes.signUpButton} onClick={() => switchSignForm(1)}>Quiero registrarme</Button>
                    : <Button className={classes.signUpButton} onClick={() => switchSignForm(0)}>Ya tengo cuenta!</Button>
                }
            </Grid>
            <Grid className={classes.formContainer} item xs={12} md={6}>
                {getCurrentForm(currentForm)}
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
        currentForm: state.authReducer.currentForm,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        switchSignForm: (form_index) => dispatch(switchSignForm(form_index)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);