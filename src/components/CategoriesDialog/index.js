import React, { Fragment } from 'react';
import { makeStyles, useTheme, } from '@material-ui/core/styles';
import { Button, Grid, Dialog, DialogActions, DialogContent, useMediaQuery, } from '@material-ui/core';

import CategoryCard from './categoryCard';
import NewCategoryCard from './newCategoryCard';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { switchCategoriesDialog, } from '../../actions';
import { CATEGORIES, } from '../../constants';


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '500px',
    },
    cardsContainer: {
        width: '100%',
    },

    cardHeader: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        fontSize: '3em',
        margin: '10px',
    },
    name: {
        fontSize: '2em',
    },
}));

function CategoriesDialog(props) {
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { categoriesDialogOpen, switchCategoriesDialog, categories, } = props;

    return (
        <Dialog
            fullScreen={fullScreen}
            open={categoriesDialogOpen}
            onClose={switchCategoriesDialog}
            aria-labelledby="task-title"
        >
            <DialogContent className={classes.root}>
                <Grid container spacing={1} className={classes.cardsContainer}>
                    {
                        categories
                            ? categories.map(category => (
                                <Fragment key={category['id']}>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={10}>
                                        <CategoryCard category={category} />
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                </Fragment>
                            ))
                            : null
                    }
                    <Fragment>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <NewCategoryCard />
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Fragment>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={switchCategoriesDialog}>
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = state => {
    return {
        categoriesDialogOpen: state.categoriesReducer.categoriesDialogOpen,
        categories: state.firestore.ordered.categories,
        auth: state.firebase.auth,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        switchCategoriesDialog: () => dispatch(switchCategoriesDialog()),
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => {
        return [{
            collection: CATEGORIES,
            where: [
                ['userId', '==', props.auth.uid],
            ],
        }];
    })
)(CategoriesDialog);