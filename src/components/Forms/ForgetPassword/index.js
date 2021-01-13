import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button, Typography, } from '@material-ui/core';
import { submitResetPassword, changeResetPasswordError, changeResetPasswordEmail, switchSignForm, } from '../../../actions';
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
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
    },
    submitButton: {
        margin: '5px',
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

function ForgetPasswordForm(props) {
    const classes = useStyles();
    const [message, setMessage] = useState('Cambia tu contraseña!');
    const [disableState, setDisableState] = useState(false);
    const { resetPasswordEmail, resetPasswordError, changeResetPasswordEmail, changeResetPasswordError, submitResetPassword, switchSignForm, } = props;

    const handleEmailBlur = () => {
        if (validateEmail(resetPasswordEmail)) {
            changeResetPasswordError('');
        } else {
            changeResetPasswordError('El email no es válido.');
        }
    }

    const sendResetPassword = () => {
        if (validateEmail(resetPasswordEmail)) {
            submitResetPassword();
            // Se pone en disable el textfield y el boton de enviar
            setDisableState(true);
            // Se cambia el mensaje
            setMessage("Consulta tu email!");
        } else {
            handleEmailBlur();
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendResetPassword();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendResetPassword();
    }

    const returnToSignin = (e) => {
        e.preventDefault();
        changeResetPasswordEmail('');
        switchSignForm(0);
        setMessage("Cambia tu contraseña!");
        setDisableState(false);
    }

    return (
        <Grid className={classes.mainContainer} container justify="center" alignItems="center">
            <Grid className={classes.titleContainer} item xs={12} md={8}>
                <Typography variant="h3" style={{ fontWeight: '300', }}>{message}</Typography>
            </Grid>
            <Grid className={classes.formContainer} item xs={12} md={8}>
                <CssTextField disabled={disableState} className={classes.textField} label="Email" type="email" variant="outlined" value={resetPasswordEmail} onChange={e => changeResetPasswordEmail(e.target.value)} onKeyDown={handleKeyDown} onBlur={handleEmailBlur} autoFocus />
            </Grid>
            <Grid className={classes.errorContainer} item xs={12} md={8}>
                <Typography className={classes.textError} variant="span">{resetPasswordError}</Typography>
            </Grid>
            <Grid className={classes.buttonsContainer} item xs={12} md={8}>
                <Button variant="outlined" className={classes.submitButton} onClick={returnToSignin}>Volver</Button>
                <Button disabled={disableState} variant="outlined" className={classes.submitButton} onKeyDown={handleKeyDown} onClick={handleSubmit}>Enviar</Button>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
        resetPasswordEmail: state.authReducer.resetPasswordEmail,
        resetPasswordError: state.authReducer.resetPasswordError,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        submitResetPassword: () => dispatch(submitResetPassword()),
        changeResetPasswordError: (error) => dispatch(changeResetPasswordError(error)),
        changeResetPasswordEmail: (email) => dispatch(changeResetPasswordEmail(email)),
        switchSignForm: (form_index) => dispatch(switchSignForm(form_index)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordForm);