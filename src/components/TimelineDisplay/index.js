import React, { Component, } from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid, Tooltip } from '@material-ui/core';
import { TASKS, } from '../../constants';
import {
    startSelectingTask, updateSelectingTask, stopSelectingTask, startCreatingTask, startNewTask,
} from '../../actions';
import { connect } from 'react-redux';
import moment from 'moment';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import TaskTile from './taskTile';

const styles = {
    boxesContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    boxHour: {
        display: 'flex',
        justifyContent: 'start',
        width: '100%',
    },
    timeMarksContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        height: '40px',
    },
    timeMark: {
        width: '100%',
        '&:hover': {
            backgroundColor: '#E1E2E6',
            cursor: 'pointer',
        },
    },
    timeMarkSelected: {
        width: '100%',
        backgroundColor: '#000',
    },
};

class TimelineDisplay extends Component {

    render() {
        const { classes, newTaskFrom, newTaskTo, newTaskToTimestamp, newTaskFromTimestamp,
            startSelectingTask, updateSelectingTask, selectingNewTask, startCreatingTask,
            selectedDay, tomorrow, tasks } = this.props;
        const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

        const startSelection = (timestamp, from) => {
            startSelectingTask(timestamp, from);
        }

        const selecting = (timestamp, time) => {
            if (!selectingNewTask) {
                return;
            }
            if (time < newTaskFrom) {
                updateSelectingTask(timestamp, time, newTaskToTimestamp, newTaskTo);
            } else if (time > newTaskFrom) {
                const toTimestamp = moment(timestamp * 1000).add(30, 'minutes').unix();
                updateSelectingTask(newTaskFromTimestamp, newTaskFrom, toTimestamp, time);
            }
        }

        const stopSelection = () => {
            startCreatingTask();
        }

        const getTooltip = (timestamp) => {
            const time = moment(timestamp * 1000);
            return time.format("HH:mm") + " - " + time.add(30, 'minutes').format("HH:mm");
        }

        const getBoxes = () => {
            let boxes = [];
            let day = moment(selectedDay * 1000);
            for (let i = 0; i < 48; i++) {
                day.seconds(0);
                day.minutes((i % 2) * 30);
                day.hours(Math.floor(i / 2));
                boxes.push({
                    size: 1,
                    task: null,
                    timestamp: day.unix(),
                    number: i,
                });
            }
            if (tasks) {
                tasks.filter( task => task['fromTimestamp'] >= selectedDay && task['toTimestamp'] <= tomorrow).map(task => {
                    boxes[task['from']]['task'] = task;
                    boxes[task['from']]['size'] = task['to'] - task['from'] + 1;
                    for (let i = task['from'] + 1; i <= task['to']; i++) {
                        boxes[i] = null;
                    }
                    return true;
                });
            }
            return boxes.filter(box => box != null);
        }

        return (
            <Grid container className={classes.root}>
                <Grid item xs={12} className={classes.boxesContainer}>
                    {
                        hours.map(hour => <div key={hour} className={classes.boxHour}>{String(hour).padStart(2, '0')}</div>)
                    }
                </Grid>
                <Grid item xs={12} className={classes.timeMarksContainer}>
                    {
                        getBoxes().map(box =>
                            !box['task']
                                ?
                                <Tooltip key={box['number']} title={getTooltip(box['timestamp'])}>
                                    <div
                                        key={box['number']}
                                        className={newTaskFrom <= box['number'] && box['number'] <= newTaskTo ? classes.timeMarkSelected : classes.timeMark}
                                        onMouseDown={() => startSelection(box['timestamp'], box['number'])}
                                        onMouseOver={() => selecting(box['timestamp'], box['number'])}
                                        onMouseUp={() => stopSelection()}
                                    >
                                    </div>
                                </Tooltip>
                                : <TaskTile key={box['number']} box={box} />
                        )}
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        newTaskFrom: state.taskReducer.createReducer.newTaskFrom,
        newTaskTo: state.taskReducer.createReducer.newTaskTo,
        newTaskToTimestamp: state.taskReducer.createReducer.newTaskToTimestamp,
        newTaskFromTimestamp: state.taskReducer.createReducer.newTaskFromTimestamp,
        selectingNewTask: state.taskReducer.createReducer.selectingNewTask,
        tasks: state.firestore.ordered.tasks,
        selectedDay: state.datetimeReducer.datetimeReducer.selectedDay,
        yesterday: state.datetimeReducer.datetimeReducer.yesterday,
        tomorrow: state.datetimeReducer.datetimeReducer.tomorrow,
        tomorrowEnd: state.datetimeReducer.datetimeReducer.tomorrowEnd,
        timeboxes: state.datetimeReducer.datetimeReducer.timeboxes,
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        startSelectingTask: (fromTimestamp, from) => dispatch(startSelectingTask(fromTimestamp, from)),
        updateSelectingTask: (fromTimestamp, from, toTimestamp, to) => dispatch(updateSelectingTask(fromTimestamp, from, toTimestamp, to)),
        stopSelectingTask: () => dispatch(stopSelectingTask()),
        startCreatingTask: () => dispatch(startCreatingTask()),
        startNewTask: (name, duration) => dispatch(startNewTask(name, duration)),
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    firestoreConnect((props) => {  
        return [{
            collection: TASKS,
            where: [
                ['userId', '==', props.auth.uid],
                ['fromTimestamp', '>=', props.yesterday],
                ['fromTimestamp', '<', props.tomorrowEnd],
            ],
        }];
    })
)(TimelineDisplay);