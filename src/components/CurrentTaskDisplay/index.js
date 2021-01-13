import React, { useState, useEffect, } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import moment from 'moment';

import { colorsAvailable } from '../../constants';
import { getEmoji } from '../../utils/emojis';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    borderWrap: {
        padding: '5px',
        borderRadius: '30px',
    },
    displayContainer: {
        border: 'solid 1px rgba(0, 0, 0, 0)',
        background: '#FAFAFA',
        borderRadius: '24px',
    },
    containerTitle: {
        fontSize: '2em',
        fontWeight: '300',
        color: '#8C8C8C',
        marginLeft: '20px',
    },
    taskTitle: {
        marginLeft: '20px',
        fontSize: '5em',
        fontWeight: '400',
    },
    countDownDisplay: {
        marginLeft: '20px',
        fontSize: '5em',
        fontWeight: '400',
    },

}));

function CurrentTaskDisplay(props) {
    const { tasks, } = props;
    const classes = useStyles();
    const [currentTask, setCurrentTask] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);

    const getBorderColor = () => {
        const defaultBackground = 'linear-gradient(to right, #232526, #414345)';
        if (currentTask) {
            const found = colorsAvailable.filter(color => color['name'] === currentTask['color'])[0];
            return found ? found['background'] : defaultBackground;
        }
        return defaultBackground;
    }

    const getBorderColorInverted = () => {
        const background = getBorderColor();
        const backgroundInverted = background.replace('right', 'left');
        return backgroundInverted;
    }

    const getCurrentTask = () => {
        if (!tasks) {
            return null;
        }
        const now = new moment().unix();
        const currentTask = tasks.filter(task => task['fromTimestamp'] <= now && task['toTimestamp'] > now);
        return currentTask[0];
    }

    const getNextTask = () => {
        if (!tasks) {
            return null;
        }
        const now = new moment().unix();
        const nextTask = tasks.filter(task => task['fromTimestamp'] > now).sort((a, b) => a['fromTimestamp'] - b['fromTimestamp']);
        return nextTask[0];
    }

    const getTimeLeft = (task) => {
        if (!task) {
            return null;
        }
        const now = moment();
        const to = moment(task['toTimestamp'] * 1000);
        const left = moment.duration(to.diff(now));
        return left;
    }

    const getTimeToStartTask = (task) => {
        if (!task) {
            return null;
        }
        const now = moment();
        const from = moment(task['fromTimestamp'] * 1000);
        const left = moment.duration(from.diff(now));
        return left;
    }

    const getHTMLTitle = (task) => {
        let title = 'Plan it!';
        if (task) {
            let emoji = getEmoji(task['icon']);
            title = 'Haciendo: ' + emoji + '' + task['name'];
        }
        return title;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTask(() => {
                let currentTask = getCurrentTask();
                document.title = getHTMLTitle(currentTask);
                return currentTask;
            });

            setTimeLeft(() => {
                let currentTask = getCurrentTask();
                if (currentTask != null) {
                    return getTimeLeft(currentTask);
                }

                let nextTask = getNextTask();
                if (nextTask != null) {
                    return getTimeToStartTask(nextTask);
                } else {
                    return null;
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [tasks]);

    const formatMomentDuration = (duration) => {
        if (!duration) {
            return "--:--:--";
        }
        return String(duration.hours()).padStart(2, '0') + ":" + String(duration.minutes()).padStart(2, '0') + ":" + String(duration.seconds()).padStart(2, '0');
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12} md={6}>
                <div className={classes.borderWrap} style={{ background: getBorderColor() }}>
                    <div className={classes.displayContainer}>
                        <h1 className={classes.containerTitle}>{currentTask ? 'Haciendo' : 'Sin tarea'}</h1>
                        <h1 className={classes.taskTitle}>{currentTask ? currentTask['name'] : '--------'}</h1>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} md={6}>
                <div className={classes.borderWrap} style={{ background: getBorderColorInverted() }}>
                    <div className={classes.displayContainer}>
                        <h1 className={classes.containerTitle}>{currentTask ? 'Tiempo restante' : 'Tiempo libre'}</h1>
                        <h1 className={classes.countDownDisplay}>{formatMomentDuration(timeLeft)}</h1>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
        tasks: state.firestore.ordered.tasks,
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTaskDisplay);