import {
    SWITCH_CATEGORIES_DIALOG,
    RESET_ALL_DATA,
} from '../../constants';

const initialStateCategories = {
    categoriesDialogOpen: false,

}

const categoriesReducer = (state = initialStateCategories, action = {}) => {
    switch (action.type) {
        case SWITCH_CATEGORIES_DIALOG:
            return { ...state, categoriesDialogOpen: !state.categoriesDialogOpen};

        case RESET_ALL_DATA:
            return initialStateCategories;
        default:
            return state;
    }
}

export default categoriesReducer;