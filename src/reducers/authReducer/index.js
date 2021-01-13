import {
    SWITCH_SIGN_FORM,
    SIGNIN_SUCCESS, SIGNIN_ERROR, SIGNOUT_SUCCESS, SIGNOUT_ERROR,
    CHANGE_SIGNIN_EMAIL, CHANGE_SIGNIN_PASSWORD,
    CHANGE_SIGNUP_NAME, CHANGE_SIGNUP_EMAIL, CHANGE_SIGNUP_PASSWORD,
    CHANGE_SIGNUP_ERROR, SIGNUP_SUCCESS, SIGNUP_ERROR, CHANGE_SIGNIN_ERROR,
    CHANGE_RESET_PASSWORD_EMAIL, CHANGE_RESET_PASSWORD_ERROR,
    RESET_ALL_DATA,
} from '../../constants';

const initState = {
    currentForm: 0,
    email: '',
    password: '',
    authError: null,

    signupName: '',
    signupEmail: '',
    signupPassword: '',
    signupError: '',

    resetPasswordEmail: '',
    resetPasswordError: '',
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case SWITCH_SIGN_FORM:
            return { ...state, currentForm: action.payload };
        case CHANGE_SIGNIN_EMAIL:
            return { ...state, email: action.payload, authError: null };
        case CHANGE_SIGNIN_PASSWORD:
            return { ...state, password: action.payload, authError: null };
        case CHANGE_SIGNIN_ERROR:
            return { ...state, authError: action.payload };
        case SIGNIN_SUCCESS:
            return { ...state, authError: null, email: '', password: '', };
        case SIGNIN_ERROR:
            return { ...state, authError: 'Login failed' };
        case SIGNOUT_SUCCESS:
            return state;
        case SIGNOUT_ERROR:
            return state;

        case CHANGE_SIGNUP_NAME:
            return { ...state, signupName: action.payload, };
        case CHANGE_SIGNUP_EMAIL:
            return { ...state, signupEmail: action.payload, };
        case CHANGE_SIGNUP_PASSWORD:
            return { ...state, signupPassword: action.payload, };
        case CHANGE_SIGNUP_ERROR:
            return { ...state, signupError: action.payload, };
        case SIGNUP_SUCCESS:
            return state;
        case SIGNUP_ERROR:
            return { ...state, signupError: action.payload, };

        case CHANGE_RESET_PASSWORD_EMAIL:
            return { ...state, resetPasswordEmail: action.payload, };
        case CHANGE_RESET_PASSWORD_ERROR:
            return { ...state, resetPasswordError: action.payload, };
        case RESET_ALL_DATA:
            return initState;
        default:
            return state;
    }
}

export default authReducer;