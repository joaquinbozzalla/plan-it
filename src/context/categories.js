import React, { Component } from 'react';
import { watchCategories, watchUserChanges, } from '../services/firebase';

export const CategoryContext = React.createContext();

export class CategoryContextProvider extends Component {
    state = {
        categories: [],
    }

    componentDidMount() {
        watchUserChanges((user) => {
            if (user && !this.isSetup) {
                this.isSetup = true;
                watchCategories((categories) => {
                    this.setState({ categories });
                });
            }
        });
        
    }

    render() {
        return (
            <CategoryContext.Provider value={this.state}>
                {this.props.children}
            </CategoryContext.Provider>
        );
    }
}

export const CategoryContextConsumer = CategoryContext.Consumer;