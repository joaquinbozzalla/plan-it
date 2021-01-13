import React, { Component } from 'react';
import { watchIcons, watchUserChanges, } from '../services/firebase';

export const IconContext = React.createContext();

export class IconContextProvider extends Component {
    state = {
        icons: [],
    }

    componentDidMount() {
        watchUserChanges((user) => {
            if (user && !this.isSetup) {
                this.isSetup = true;
                watchIcons((icons) => {
                    this.setState({ icons });
                });
            }
        });
        
    }

    render() {
        return (
            <IconContext.Provider value={this.state}>
                {this.props.children}
            </IconContext.Provider>
        );
    }
}

export const IconContextConsumer = IconContext.Consumer;