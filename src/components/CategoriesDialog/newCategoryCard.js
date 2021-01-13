import React, { useState, useCallback, } from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import { Grid, Card, IconButton, TextField, } from '@material-ui/core';

import Icon from '@material-ui/core/Icon';
import WorkIcon from '@material-ui/icons/Work';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import BrushIcon from '@material-ui/icons/Brush';
import BuildIcon from '@material-ui/icons/Build';
import SchoolIcon from '@material-ui/icons/School';
import ComputerIcon from '@material-ui/icons/Computer';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import HotelIcon from '@material-ui/icons/Hotel';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

import { colorsAvailable } from '../../constants';
import { createCategory, } from '../../actions/categoriesActions';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '3em',
        background: '#fff',
    },
    colorOption: {
        width: '25px',
        height: '25px',
        borderRadius: '25px',
        margin: '3px',
    },
    doneIcon: {
        color: '#fff',
    },
    deleteIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'rgba(0, 0, 0, 0.5)',
    },
    iconOption: {
        width: '34px',
        height: '34px',
        borderRadius: '34px',
        margin: '3px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000',
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    createHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionIcon: {
        color: '#000',
        margin: '10px',
    },
    icon: {
        fontSize: '3em',
        margin: '10px',
    },
    name: {
        fontSize: '2em',
    },
    nameTextfield: {
        marginLeft: '10px',
        '& .MuiInput-underline': {
            color: '#000',
            fontSize: '2em',
            fontWeight: '300',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#000',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#000',
        },
    },
});


function NewCategoryCard(props) {
    const { createCategory, } = props;
    const classes = useStyles();
    const [creating, setCreating] = useState(false);
    const [newName, setNewName] = useState('');
    const [newIcon, setNewIcon] = useState('');
    const [newColor, setNewColor] = useState('');

    const iconsAvailable = ['Audiotrack', 'Brush', 'Build', 'School', 'Computer', 'Restaurant', 'Hotel', 'LocalGroceryStore', 'SportsEsports', 'Work', 'FitnessCenter'];

    const getIcon = (name, classes) => {
        switch (name) {
            case 'Audiotrack':
                return <AudiotrackIcon className={classes} />
            case 'Brush':
                return <BrushIcon className={classes} />
            case 'Build':
                return <BuildIcon className={classes} />
            case 'School':
                return <SchoolIcon className={classes} />
            case 'Computer':
                return <ComputerIcon className={classes} />
            case 'Restaurant':
                return <RestaurantIcon className={classes} />
            case 'Hotel':
                return <HotelIcon className={classes} />
            case 'LocalGroceryStore':
                return <LocalGroceryStoreIcon className={classes} />
            case 'SportsEsports':
                return <SportsEsportsIcon className={classes} />
            case 'Work':
                return <WorkIcon className={classes} />
            case 'FitnessCenter':
                return <FitnessCenterIcon className={classes} />
            default:
                break;
        }
        return null;
    }

    const openCreating = useCallback(
        () => setCreating(prev => true),
        [setCreating],
    );
    const closeCreating = useCallback(
        () => setCreating(prev => false),
        [setCreating],
    );

    const startCreating = () => {
        openCreating();
    }
    const stopCreating = () => {
        if (newName.length > 0) {
            createCategory(newName, newColor, newIcon);
            closeCreating();
        } else {
            // enfocar
        }

    }
    const cancelCreating = () => {
        closeCreating();
        setNewName('');
        setNewColor('');
        setNewIcon('');
    }

    return (
        <Card className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} className={classes.cardHeader}>
                    {
                        creating
                            ? <div className={classes.createHeader}>
                                <TextField placeholder="Nombre" className={classes.nameTextfield} value={newName} onChange={e => setNewName(e.target.value)} />
                                <IconButton onClick={cancelCreating} aria-label="edit" className={classes.actionIcon} >
                                    <ClearIcon />
                                </IconButton>
                                <IconButton onClick={stopCreating} aria-label="edit" className={classes.actionIcon} >
                                    <DoneIcon />
                                </IconButton>
                            </div>
                            : <Icon onClick={startCreating}>add</Icon>


                    }

                </Grid>
                {
                    creating
                        ? <Grid item xs={12} >
                            <Grid container>
                                <Grid item xs={12} className={classes.optionsContainer}>
                                    {
                                        iconsAvailable.map(icon =>
                                            <div key={icon} className={classes.iconOption} style={{ backgroundColor: newIcon === icon ? 'rgba(0, 0, 0, 0.3)' : null }} onClick={() => setNewIcon(icon)}>
                                                {getIcon(icon)}
                                            </div>)
                                    }
                                </Grid>
                                <Grid item xs={12} className={classes.optionsContainer}>
                                    {
                                        colorsAvailable.map(color =>
                                            <div key={color['name']} className={classes.colorOption} style={{ background: color['background'] }} onClick={() => setNewColor(color['name'])}>{newColor === color['name'] ? <Icon className={classes.doneIcon}>done</Icon> : null}</div>)
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                        : null
                }

            </Grid>
        </Card>
    );
}


const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createCategory: (name, color, icon) => dispatch(createCategory(name, color, icon)),
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(NewCategoryCard);