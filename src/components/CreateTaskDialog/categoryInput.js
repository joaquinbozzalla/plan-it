import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import {
    changeNewTaskCategory,
} from '../../actions';
import { CATEGORIES, } from '../../constants';

const filter = createFilterOptions();

function CategoryInput(props) {
    const { categories, newTaskCategory, changeNewTaskCategory, onEnterPressed } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <Autocomplete
            onOpen={ () => setOpen(true)}
            onClose={ () => setOpen(false)}
            onKeyDown={(e) => onEnterPressed(e, open)}
            value={newTaskCategory}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    changeNewTaskCategory({
                        name: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    changeNewTaskCategory({
                        name: newValue.inputValue,
                    });
                } else {
                    changeNewTaskCategory(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        name: `Add "${params.inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="category-input"
            options={categories ? categories : []}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.name;
            }}
            renderOption={(option) => option.name}
            style={{ width: '100%' }}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label="Categoría" />
            )}
        />
    );
}

const mapStateToProps = state => {
    return {
        categories: state.firestore.ordered.categories,
        newTaskCategory: state.taskReducer.createReducer.newTaskCategory,
        auth: state.firebase.auth,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeNewTaskCategory: (category) => dispatch(changeNewTaskCategory(category)),
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
)(CategoryInput);