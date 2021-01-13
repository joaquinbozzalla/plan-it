import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button, Typography, } from '@material-ui/core';
import { signIn, changeSigninEmail, changeSigninPassword, changeSigninError, switchSignForm, } from '../../../actions';
import { connect } from 'react-redux';
import { validateEmail, } from '../../../utils/validation';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    textField: {
        width: '100%',
        margin: '10px',
    },
    loginButton: {
        color: '#fff',
        borderRadius: '20px',
        width: '50%',
        background: 'linear-gradient(to right, #BF05F2, #110273) no-repeat 0 0 / cover',
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '50px',
    },
    errorContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        color: 'red',
        padding: '10px',
    },
    forgetPasswordContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        color: '#240281',
        padding: '10px',
    },
    textError: {
        minHeight: '1.3em',
    },
}));

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#110273',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#110273',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#110273',
            },
        },
    },
})(TextField);

function SigninForm(props) {
    const classes = useStyles();
    const { email, password, authError, signIn, changeSigninEmail, changeSigninPassword, changeSigninError, switchSignForm, } = props;

    const handleEmailBlur = () => {
        if (validateEmail(email)) {
            changeSigninError('');
        } else {
            changeSigninError('El email no es válido.');
        }
    }

    const signInUser = () => {
        if(validateEmail(email)) {
            signIn();
        } else {
            handleEmailBlur();
        }
    } 

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            signInUser();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signInUser();
    }

    const handleForgetPassword = (e) => {
        e.preventDefault();
        switchSignForm(2);
    }

    return (
        <Grid className={classes.mainContainer} container justify="center" alignItems="center">
            <Grid className={classes.titleContainer} item xs={12} md={8}>
                <Typography variant="h1">Sign in</Typography>
            </Grid>
            <Grid className={classes.formContainer} item xs={12} md={8}>
                <CssTextField className={classes.textField} label="Email" type="email" variant="outlined" value={email} onChange={e => changeSigninEmail(e.target.value)} onKeyDown={handleKeyDown} onBlur={handleEmailBlur} autoFocus/>
            </Grid>
            <Grid className={classes.formContainer} item xs={12} md={8}>
                <CssTextField className={classes.textField} label="Contraseña" type="password" variant="outlined" value={password} onChange={e => changeSigninPassword(e.target.value)} onKeyDown={handleKeyDown} />
            </Grid>
            <Grid className={classes.forgetPasswordContainer} item xs={12} md={8}>
                <Button onClick={handleForgetPassword}><Typography className={classes.forgetPassword} variant="span">Olvidé mi contraseña</Typography></Button>
            </Grid>
            <Grid className={classes.errorContainer} item xs={12} md={8}>
                <Typography className={classes.textError} variant="span">{authError}</Typography>
            </Grid>
            <Grid className={classes.formContainer} item xs={12} md={8}>
                <Button className={classes.loginButton} onKeyDown={handleKeyDown} onClick={handleSubmit}>Entrar</Button>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
        email: state.authReducer.email,
        password: state.authReducer.password,
        authError: state.authReducer.authError,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signIn: () => dispatch(signIn()),
        changeSigninEmail: (email) => dispatch(changeSigninEmail(email)),
        changeSigninPassword: (password) => dispatch(changeSigninPassword(password)),
        changeSigninError: (error) => dispatch(changeSigninError(error)),
        switchSignForm: (form_index) => dispatch(switchSignForm(form_index)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);