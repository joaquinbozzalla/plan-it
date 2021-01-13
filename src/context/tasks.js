import React, { Component } from 'react';
import { watchTasks, watchUserChanges, } from '../services/firebase';

export const TaskContext = React.createContext();

export class TaskContextProvider extends Component {
    state = {
        tasks: [],
    }

    componentDidMount() {
        watchUserChanges((user) => {
            if (user && !this.isSetup) {
                this.isSetup = true;
                watchTasks((tasks) => {
                    this.setState({ tasks });
                });
            }
        });
        
    }

    render() {
        return (
            <TaskContext.Provider value={this.state}>
                {this.props.children}
            </TaskContext.Provider>
        );
    }
}

export const TaskContextConsumer = TaskContext.Consumer;