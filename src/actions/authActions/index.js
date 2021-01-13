import {
    SWITCH_SIGN_FORM,
    SIGNIN_SUCCESS, SIGNIN_ERROR, SIGNOUT_SUCCESS, SIGNOUT_ERROR,
    CHANGE_SIGNIN_EMAIL, CHANGE_SIGNIN_PASSWORD,
    CHANGE_SIGNUP_NAME, CHANGE_SIGNUP_EMAIL, CHANGE_SIGNUP_PASSWORD,
    CHANGE_SIGNUP_ERROR, SIGNUP_SUCCESS, SIGNUP_ERROR, CHANGE_SIGNIN_ERROR,
    CHANGE_RESET_PASSWORD_EMAIL, CHANGE_RESET_PASSWORD_ERROR,
    USERS,
} from '../../constants';

export const switchSignForm = (form_index) => ({
    type: SWITCH_SIGN_FORM,
    payload: form_index
});
export const changeSigninEmail = (email) => ({
    type: CHANGE_SIGNIN_EMAIL,
    payload: email
});
export const changeSigninPassword = (password) => ({
    type: CHANGE_SIGNIN_PASSWORD,
    payload: password
});
export const changeSigninError = (error) => ({
    type: CHANGE_SIGNIN_ERROR,
    payload: error
});
//-----------------------------------------------------------------------------------------------
export const signinSuccess = () => ({
    type: SIGNIN_SUCCESS,
});
export const signinError = (error) => ({
    type: SIGNIN_ERROR,
    error: error
});
export const signIn = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const { authReducer } = getState();
        const { email, password } = authReducer;

        firebase.auth().signInWithEmailAndPassword(
            email,
            password
        ).then(() => {
            dispatch(signinSuccess());
        }).catch((error) => {
            dispatch(signinError(error));
        });
    }
}
//-----------------------------------------------------------------------------------------------
export const signOutSuccess = () => ({
    type: SIGNOUT_SUCCESS,
});
export const signOutError = (error) => ({
    type: SIGNOUT_ERROR,
    error: error
});

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch(signOutSuccess());
        }).catch((error) => {
            dispatch(signOutError(error));
        });
    }
}
//-----------------------------------------------------------------------------------------------
export const signupSuccess = () => ({
    type: SIGNUP_SUCCESS,
});
export const signupError = (error) => ({
    type: SIGNUP_ERROR,
    error: error.message
});

export const signUp = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const { authReducer } = getState();
        const { signupEmail, signupPassword, signupName } = authReducer;

        firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPassword)
            .then((resp) => {
                if (resp && resp.user.emailVerified === false) {
                    resp.user.sendEmailVerification();
                }
                return firestore.collection(USERS).doc(resp.user.uid).set({
                    name: signupName
                })
            })
            .then(() => dispatch(signupSuccess()))
            .catch((error) => {
                dispatch(changeSignupError(error.message));
            });
    }
}
//-----------------------------------------------------------------------------------------------
export const changeSignupName = (name) => ({
    type: CHANGE_SIGNUP_NAME,
    payload: name
});
export const changeSignupEmail = (email) => ({
    type: CHANGE_SIGNUP_EMAIL,
    payload: email
});
export const changeSignupPassword = (password) => ({
    type: CHANGE_SIGNUP_PASSWORD,
    payload: password
});
export const changeSignupError = (error) => ({
    type: CHANGE_SIGNUP_ERROR,
    payload: error
});

//-----------------------------------------------------------------------------------------------
export const changeResetPasswordEmail = (email) => ({
    type: CHANGE_RESET_PASSWORD_EMAIL,
    payload: email
});

export const changeResetPasswordError = (error) => ({
    type: CHANGE_RESET_PASSWORD_ERROR,
    payload: error
});

export const submitResetPassword = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const { authReducer } = getState();
        const { resetPasswordEmail } = authReducer;

        firebase.auth().sendPasswordResetEmail(resetPasswordEmail);
    }
}