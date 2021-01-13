import React, { Component } from 'react';
import { watchColors, watchUserChanges, } from '../services/firebase';

export const ColorContext = React.createContext();

export class ColorContextProvider extends Component {
    state = {
        colors: [],
    }

    componentDidMount() {
        watchUserChanges((user) => {
            if (user && !this.isSetup) {
                this.isSetup = true;
                watchColors((colors) => {
                    this.setState({ colors });
                });
            }
        });
        
    }

    render() {
        return (
            <ColorContext.Provider value={this.state}>
                {this.props.children}
            </ColorContext.Provider>
        );
    }
}

export const ColorContextConsumer = ColorContext.Consumer;