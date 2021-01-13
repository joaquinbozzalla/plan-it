import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
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

import {
    deleteTaskById,
} from '../../actions';

import { getColor, } from '../../utils/colors';

const useStyles = makeStyles({
    root: {
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        transitionDuration: '0.5s',
        overflow: 'hidden',
        width: box => 100 * box.size + '%',
        background: box => box.task['color'] !== "" ? getColor(box.task['color'])['background'] : '#E1E2E6',
        '&:hover': {
            width: '1000%',
            height: '200%',
            borderRadius: '0px 0px 10px 10px',
            alignItems: 'start',
        },
        '&:hover $taskName': {
            display: 'inline-block',
        },

        '&:hover $footerContainer': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
        },

    },
    titleContainer: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    taskName: {
        display: 'none',
        fontSize: '1.5em',
        fontWeight: '300',
        color: box => box.task['color'] !== "" ? getColor(box.task['color'])['primaryColor'] : '#000',
        clear: 'both',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        margin: '5px',
    },
    icon: {
        marginLeft: '5px',
        color: box => box.task['color'] !== "" ? getColor(box.task['color'])['primaryColor'] : '#000',
    },
    footerContainer: {
        display: 'none',
        width: '100%',
    },
    hoursDisplay: {
        color: box => box.task['color'] !== "" ? getColor(box.task['color'])['secondaryColor'] : '#fff',
        fontWeight: '300',
        marginLeft: '5px',
        marginBottom: '5px',
    },
    deleteIcon: {
        margin: '5px',
        color: box => box.task['color'] !== "" ? getColor(box.task['color'])['secondaryColor'] : '#fff',
    },
});

function TaskTile(props) {
    const { box, deleteTaskById, } = props;
    const { task } = box;
    const classes = useStyles(box);

    const getIcon = (name) => {
        switch (name) {
            case 'Audiotrack':
                return <AudiotrackIcon className={classes.icon}/>
            case 'Brush':
                return <BrushIcon className={classes.icon}/>
            case 'Build':
                return <BuildIcon className={classes.icon}/>
            case 'School':
                return <SchoolIcon className={classes.icon}/>
            case 'Computer':
                return <ComputerIcon className={classes.icon}/>
            case 'Restaurant':
                return <RestaurantIcon className={classes.icon}/>
            case 'Hotel':
                return <HotelIcon className={classes.icon}/>
            case 'LocalGroceryStore':
                return <LocalGroceryStoreIcon className={classes.icon}/>
            case 'SportsEsports':
                return <SportsEsportsIcon className={classes.icon}/>
            case 'WorkIcon':
                return <WorkIcon className={classes.icon}/>
            case 'FitnessCenter':
                return <FitnessCenterIcon className={classes.icon}/>
            default:
                break;
        }
        return null;
    }

    return (
        <div className={classes.root}>
            <div className={classes.titleContainer}>
                {getIcon(task['icon'])}
                <span className={classes.taskName}>{task['name']}</span>
            </div>
            <div className={classes.footerContainer}>
                <span className={classes.hoursDisplay}>{'De ' + moment(task['fromTimestamp'] * 1000).format("HH:mm") + ' a ' + moment(task['toTimestamp'] * 1000).format("HH:mm")}</span>
                <IconButton aria-label="delete" className={classes.deleteIcon} size="small" onClick={() => deleteTaskById(task['id'])}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
        deleteTaskById: (id) => dispatch(deleteTaskById(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskTile);