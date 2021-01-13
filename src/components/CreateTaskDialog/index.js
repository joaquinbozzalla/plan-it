import React, { useRef } from 'react';
import { makeStyles, useTheme, } from '@material-ui/core/styles';
import { Button, Grid, Dialog, DialogActions, DialogContent, TextField, useMediaQuery, Icon, } from '@material-ui/core';

import WorkIcon from '@material-ui/icons/Work';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import BrushIcon from '@material-ui/icons/Brush';
import BuildIcon from '@material-ui/icons/Build';
import SchoolIcon from '@material-ui/icons/School';
import ComputerIcon from '@material-ui/icons/Computer';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import HotelIcon from '@material-ui/icons/Hotel';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

import CaretoryInput from './categoryInput';
import { colorsAvailable } from '../../constants';

import {
    stopCreatingTask, changeNewTaskCategory, changeNewTaskName, changeNewTaskDescription, changeNewTaskIcon, changeNewTaskColor,
    sendNewTaskToServer,
} from '../../actions';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    colorOption: {
        width: '25px',
        height: '25px',
        borderRadius: '25px',
        margin: '3px',
    },
    doneIcon: {
        color: '#fff',
    },
    iconOption: {
        width: '34px',
        height: '34px',
        borderRadius: '34px',
        color: '#000',
        margin: '3px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    textfield: {
        width: '100%',
    },
}));

function CreateTaskDialog(props) {
    const theme = useTheme();
    const classes = useStyles();
    const refFocusField = useRef(null);
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { newTaskDialogOpened, stopCreatingTask,
        newTaskName, newTaskIcon, newTaskColor,
        changeNewTaskName, changeNewTaskIcon, changeNewTaskColor,
        sendNewTaskToServer,
    } = props;

    const iconsAvailable = ['Audiotrack', 'Brush', 'Build', 'School', 'Computer', 'Restaurant', 'Hotel', 'LocalGroceryStore', 'SportsEsports', 'Work', 'FitnessCenter'];

    const getIcon = (name) => {
        switch (name) {
            case 'Audiotrack':
                return <AudiotrackIcon />
            case 'Brush':
                return <BrushIcon />
            case 'Build':
                return <BuildIcon />
            case 'School':
                return <SchoolIcon />
            case 'Computer':
                return <ComputerIcon />
            case 'Restaurant':
                return <RestaurantIcon />
            case 'Hotel':
                return <HotelIcon />
            case 'LocalGroceryStore':
                return <LocalGroceryStoreIcon />
            case 'SportsEsports':
                return <SportsEsportsIcon />
            case 'Work':
                return <WorkIcon />
            case 'FitnessCenter':
                return <FitnessCenterIcon />
            default:
                break;
        }
        return null;
    }

    const handleKeyDown = (event, open) => {
        if (event.key === 'Enter' && !open) {
            createTask();
        }
    }
    
    const createTask = () => {
        if(newTaskName && newTaskName.length > 0) {
            sendNewTaskToServer();
        } else {
            refFocusField.current.focus()
        }
    }

    return (
        <Dialog
            fullScreen={fullScreen}
            open={newTaskDialogOpened}
            onClose={stopCreatingTask}
            onEnter={() => refFocusField.current.focus()}
            aria-labelledby="task-title"
        >
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={8}>
                        <TextField onKeyDown={handleKeyDown} inputRef={refFocusField} className={classes.textfield} id="name-textfield" label="Nombre" onChange={event => changeNewTaskName(event.target.value)} value={newTaskName}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CaretoryInput onEnterPressed={handleKeyDown} />
                        
                    </Grid>
                    <Grid item xs={12} className={classes.optionsContainer}>
                        {
                            iconsAvailable.map(icon =>
                                <div key={icon} className={classes.iconOption} style={{ backgroundColor: newTaskIcon === icon ? '#E1E2E6' : '#fff' }} onClick={event => changeNewTaskIcon(icon)}>
                                    {getIcon(icon)}
                                </div>)
                        }
                    </Grid>
                    <Grid item xs={12} className={classes.optionsContainer}>
                        {
                            colorsAvailable.map(color =>
                                <div key={color['name']} className={classes.colorOption} style={{ background: color['background'] }} onClick={event => changeNewTaskColor(color['name'])}>{newTaskColor === color['name'] ? <Icon className={classes.doneIcon}>done</Icon> : null}</div>)
                        }
                    </Grid>

                </Grid>

            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={stopCreatingTask}>
                    Cancelar
          </Button>
                <Button onClick={createTask}>
                    Terminar
          </Button>
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = state => {
    return {
        newTaskDialogOpened: state.taskReducer.createReducer.newTaskDialogOpened,
        newTaskCategory: state.taskReducer.createReducer.newTaskCategory,
        newTaskName: state.taskReducer.createReducer.newTaskName,
        newTaskDescription: state.taskReducer.createReducer.newTaskDescription,
        newTaskIcon: state.taskReducer.createReducer.newTaskIcon,
        newTaskColor: state.taskReducer.createReducer.newTaskColor,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        stopCreatingTask: () => dispatch(stopCreatingTask()),
        changeNewTaskCategory: (category) => dispatch(changeNewTaskCategory(category)),
        changeNewTaskName: (name) => dispatch(changeNewTaskName(name)),
        changeNewTaskDescription: (description) => dispatch(changeNewTaskDescription(description)),
        changeNewTaskIcon: (icon) => dispatch(changeNewTaskIcon(icon)),
        changeNewTaskColor: (color) => dispatch(changeNewTaskColor(color)),
        sendNewTaskToServer: () => dispatch(sendNewTaskToServer()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskDialog);