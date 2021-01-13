import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button, Typography, } from '@material-ui/core';
import { changeSignupName, changeSignupEmail, changeSignupPassword, changeSignupError, signUp, } from '../../../actions';
import { connect } from 'react-redux';
import { validateEmail, validatePassword, validateUserName, } from '../../../utils/validation';

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

function SignupForm(props) {
    const classes = useStyles();
    const { signupError, signupName, signupEmail, signupPassword, changeSignupName, changeSignupEmail, changeSignupPassword, changeSignupError, signUp, } = props;

    const handleNameBlur = () => {
        if (validateUserName(signupName)) {
            changeSignupError('');
        } else {
            changeSignupError('El nombre no es válido.');
        }
    }
    const handleEmailBlur = () => {
        if (validateEmail(signupEmail)) {
            changeSignupError('');
        } else {
            changeSignupError('El email no es válido.');
        }
    }
    const handlePasswordBlur = () => {
        if (validatePassword(signupPassword)) {
            changeSignupError('');
        } else {
            changeSignupError('La contraseña no es válida.');
        }
    }

    const signUpUser = () => {
        if (validateEmail(signupEmail) && validatePassword(signupPassword)) {
            changeSignupError('');
            signUp();
        } else {
            handlePasswordBlur();
            handleEmailBlur();
            handleNameBlur();
            signUp();
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            signUpUser();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signUpUser();
    }

    return (
        <Grid className={classes.mainContainer} container justify="center" alignItems="center">
            <Grid className={classes.titleContainer} item xs={12} md={8}>
                <Typography variant="h1">Sign up</Typography>
            </Grid>
            <Grid className={classes.formContainer} item xs={12} md={8}>
                <CssTextField className={classes.textField} label="Nombre" type="text" variant="outlined" value={signupName} onChange={e => changeSignupName(e.target.value)} onKeyDown={handleKeyDown} onBlur={handleNameBlur} autoFocus/>
            </Grid>
            <Grid className={classes.formContainer} item xs={12} md={8}>
                <CssTextField className={classes.textField} label="Email" type="email" variant="outlined" value={signupEmail} onChange={e => changeSignupEmail(e.target.value)} onKeyDown={handleKeyDown} onBlur={handleEmailBlur} />
            </Grid>
            <Grid className={classes.formContainer} item xs={12} md={8}>
                <CssTextField className={classes.textField} label="Contraseña" type="password" variant="outlined" value={signupPassword} onChange={e => changeSignupPassword(e.target.value)} onKeyDown={handleKeyDown} onBlur={handlePasswordBlur} />
            </Grid>
            <Grid className={classes.errorContainer} item xs={12} md={8}>
                <Typography className={classes.textError} variant="span">{signupError}</Typography>
            </Grid>
            <Grid className={classes.formContainer} item xs={12} md={8}>
                <Button className={classes.loginButton} onClick={handleSubmit} onKeyDown={handleKeyDown}>Registrarse</Button>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
        signupName: state.authReducer.signupName,
        signupEmail: state.authReducer.signupEmail,
        signupPassword: state.authReducer.signupPassword,
        signupError: state.authReducer.signupError,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeSignupName: (name) => dispatch(changeSignupName(name)),
        changeSignupEmail: (email) => dispatch(changeSignupEmail(email)),
        changeSignupPassword: (password) => dispatch(changeSignupPassword(password)),
        changeSignupError: (error) => dispatch(changeSignupError(error)),
        signUp: () => dispatch(signUp()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);