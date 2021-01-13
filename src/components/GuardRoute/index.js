import React from "react";
import { Route, Redirect, } from "react-router-dom";
import { connect } from 'react-redux';
import VerifyEmailPage from '../../pages/VerifyEmailPage';

function GuardRoute(props) {
    const { type, ...rest } = props;
    if(props.auth && props.auth.emailVerified === false) {
        return <VerifyEmailPage />;
    }
    if (type === 'private' && !props.auth.uid) {
        return <Redirect to='/login' />
    } else if (type === 'public' && props.auth.uid) {
        return <Redirect to='/' />
    }
    return (
        <Route {...rest} />
    );
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps)(GuardRoute);