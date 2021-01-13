import React, { Component } from 'react';
import ResponsiveDrawer from '../../components/Drawer';
import DayDisplay from '../../components/DayDisplay';
import CurrentTaskDisplay from '../../components/CurrentTaskDisplay';
import TimelineDisplay from '../../components/TimelineDisplay';
import CreateTaskDialog from '../../components/CreateTaskDialog';
import CategoriesDialog from '../../components/CategoriesDialog';
import { AuthContext } from '../../context/auth';

class HomePage extends Component {

    render() {
        return (
            <ResponsiveDrawer title="Plan it!">
                <DayDisplay />
                <TimelineDisplay />
                <CurrentTaskDisplay />
                <CreateTaskDialog />
                <CategoriesDialog />
            </ResponsiveDrawer>
        );
    }
}

HomePage.contextType = AuthContext;

export default HomePage;