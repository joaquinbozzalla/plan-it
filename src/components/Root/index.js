import React, { Component } from "react";
import { AuthContext } from '../../context/auth';

class Root extends Component {
    render() {
        const { children } = this.props;
        const { authReady } = this.context;
        if (!authReady) {
            return <div>Loading...</div>;
        }
        return children;
    }
}

Root.contextType = AuthContext;

export default Root;