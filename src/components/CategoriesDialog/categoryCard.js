import React, { useState } from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import { Grid, Typography, Card, IconButton, TextField, Tooltip, Icon, } from '@material-ui/core';

import WorkIcon from '@material-ui/icons/Work';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import BrushIcon from '@material-ui/icons/Brush';
import BuildIcon from '@material-ui/icons/Build';
import SchoolIcon from '@material-ui/icons/School';
import ComputerIcon from '@material-ui/icons/Computer';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import HotelIcon from '@material-ui/icons/Hotel';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

import { colorsAvailable } from '../../constants';
import { getColor, } from '../../utils/colors';
import { updateCategory, deleteCategory, } from '../../actions/categoriesActions';
import { connect } from 'react-redux';

const useStyles = makeStyles({
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
        color: category => category.color !== "" ? getColor(category.color)['primaryColor'] : '#000',
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    root: {
        background: category => category.color ? getColor(category.color)['background'] : '#E1E2E6',
        color: category => category.color !== "" ? getColor(category.color)['primaryColor'] : '#000',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
    },
    actionIcon: {
        color: category => category.color !== "" ? getColor(category.color)['primaryColor'] : '#000',
        marginLeft: 'auto',
        marginRight: '10px',
    },
    icon: {
        fontSize: '3em',
        margin: '10px',
    },
    name: {
        fontSize: '2em',
    },
    nameTextfield: {
        '& .MuiInput-underline': {
            color: category => category.color !== "" ? getColor(category.color)['primaryColor'] : '#000',
            fontSize: '2em',
            fontWeight: '300',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: category => category.color !== "" ? getColor(category.color)['primaryColor'] : '#000',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: category => category.color !== "" ? getColor(category.color)['primaryColor'] : '#000',
        },
    },
});


function CategoryCard(props) {
    const { category, updateCategory, deleteCategory, } = props;
    const { name, icon, color } = category;
    const classes = useStyles(category);
    const [edit, setEdit] = useState(false);
    const [nameSelected, setNameSelected] = useState(name);
    const [iconSelected, setIconSelected] = useState(icon);
    const [colorSelected, setColorSelected] = useState(color);

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

    const startEditing = () => {
        setEdit(true);
    }
    const stopEditing = () => {
        if (nameSelected.length > 0) {
            updateCategory(category['id'], nameSelected, colorSelected, iconSelected);
            setEdit(false);
        } else {
            // enfocar
        }

    }

    return (
        <Card className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} className={classes.cardHeader}>
                    {getIcon(icon, classes.icon)}
                    {
                        edit
                            ? <TextField className={classes.nameTextfield} value={nameSelected} onChange={e => setNameSelected(e.target.value)} />
                            : <Typography className={classes.name} variant="h1">{name}</Typography>
                    }


                    {
                        edit
                            ? <IconButton onClick={stopEditing} aria-label="done" className={classes.actionIcon}>
                                <DoneIcon fontSize="large" />
                            </IconButton>
                            : <IconButton onClick={startEditing} aria-label="edit" className={classes.actionIcon} >
                                <EditIcon fontSize="large" />
                            </IconButton>
                    }


                </Grid>
                {
                    edit
                        ? <Grid item xs={12} >
                            <Grid container>
                                <Grid item xs={12} className={classes.optionsContainer}>
                                    {
                                        iconsAvailable.map(icon =>
                                            <div key={icon} className={classes.iconOption} style={{ backgroundColor: iconSelected === icon ? 'rgba(0, 0, 0, 0.3)' : null }} onClick={() => setIconSelected(icon)}>
                                                {getIcon(icon)}
                                            </div>)
                                    }
                                </Grid>
                                <Grid item xs={11} className={classes.optionsContainer}>
                                    {
                                        colorsAvailable.map(color =>
                                            <div key={color['name']} className={classes.colorOption} style={{ background: color['background'] }} onClick={() => setColorSelected(color['name'])}>{colorSelected === color['name'] ? <Icon className={classes.doneIcon}>done</Icon> : null}</div>)
                                    }
                                </Grid>
                                <Grid item xs={1}>
                                    <Tooltip title="Eliminar categoría">
                                        <IconButton  className={classes.deleteIcon} onClick={() => deleteCategory(category['id'])} aria-label="delete" size="small">
                                            <Icon>delete</Icon>
                                        </IconButton>
                                    </Tooltip>
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
        updateCategory: (id, name, color, icon) => dispatch(updateCategory(id, name, color, icon)),
        deleteCategory: (id) => dispatch(deleteCategory(id)),
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(CategoryCard);