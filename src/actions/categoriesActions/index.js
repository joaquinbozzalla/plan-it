import {
    SWITCH_CATEGORIES_DIALOG, CATEGORIES,
} from '../../constants';

export const switchCategoriesDialog = () => ({
    type: SWITCH_CATEGORIES_DIALOG
});

export const updateCategory = (id, name, color, icon) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
        const firestore = getFirestore();

        firestore.collection(CATEGORIES).doc(id).update({
            name, color, icon
        });
    }
};

export const deleteCategory = (id) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
        const firestore = getFirestore();

        firestore.collection(CATEGORIES).doc(id).delete();
    }
};


export const createCategory = (name, color, icon) => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;

        firestore.collection(CATEGORIES).add({
            userId: userId,
            name: name,
            color: color,
            icon: icon,
        });
    }
};