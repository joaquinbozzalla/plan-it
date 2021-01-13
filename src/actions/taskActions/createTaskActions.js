import {
    START_SELECTING_TASK, UPDATE_SELECTING_TASK, STOP_SELECTING_TASK,
    START_CREATING_TASK, STOP_CREATING_TASK,
    CHANGE_NEWTASK_CATEGORY, CHANGE_NEWTASK_NAME, CHANGE_NEWTASK_DESCRIPTION, CHANGE_NEWTASK_ICON, CHANGE_NEWTASK_COLOR,
    CATEGORIES, TASKS,
} from '../../constants';

export const startSelectingTask = (fromTimestamp, from) => ({
    type: START_SELECTING_TASK,
    payload: {
        fromTimestamp, from
    }
});
export const updateSelectingTask = (fromTimestamp, from, toTimestamp, to) => ({
    type: UPDATE_SELECTING_TASK,
    payload: {
        fromTimestamp, from, toTimestamp, to
    }
});
export const stopSelectingTask = () => ({
    type: STOP_SELECTING_TASK,
});
//--------------------------------------------------------------------------------
export const startCreatingTask = () => ({
    type: START_CREATING_TASK,
});
export const stopCreatingTask = () => ({
    type: STOP_CREATING_TASK,
});
export const sendNewTaskToServer = () => {
    return (dispatch, getState, {getFirestore, getFirebase}) => {
        const { taskReducer } = getState();
        const { newTaskCategory, newTaskName, newTaskDescription, newTaskIcon, newTaskColor, newTaskFrom, newTaskTo, newTaskFromTimestamp, newTaskToTimestamp } = taskReducer.createReducer;
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;

        const category = newTaskCategory ? newTaskCategory['name'] : '';
        if(category && !newTaskCategory['id']) { // Si no tiene ID hay que crear la categoría
            firestore.collection(CATEGORIES).add({
                userId: userId,
                name: category,
                color: newTaskColor,
                icon: newTaskIcon,
            });
        } else if(category && newTaskCategory['id'] && (newTaskCategory['color'] !== newTaskColor || newTaskCategory['icon'] !== newTaskIcon)){
            firestore.collection(CATEGORIES).doc(newTaskCategory['id']).update({
                color: newTaskColor,
                icon: newTaskIcon,
            });
        }
        
        firestore.collection(TASKS).add({
            userId: userId,
            category: category,
            name: newTaskName,
            description: newTaskDescription,
            icon: newTaskIcon,
            color: newTaskColor,
            from: newTaskFrom,
            to: newTaskTo,
            fromTimestamp: newTaskFromTimestamp,
            toTimestamp: newTaskToTimestamp,
            "base": 48
        }).then(() => dispatch(stopCreatingTask()));
    }
};
//--------------------------------------------------------------------------------
export const changeNewTaskCategory = (category) => ({
    type: CHANGE_NEWTASK_CATEGORY,
    payload: category
});
export const changeNewTaskName = (name) => ({
    type: CHANGE_NEWTASK_NAME,
    payload: name
});
export const changeNewTaskDescription = (description) => ({
    type: CHANGE_NEWTASK_DESCRIPTION,
    payload: description
});
export const changeNewTaskIcon = (icon) => ({
    type: CHANGE_NEWTASK_ICON,
    payload: icon
});
export const changeNewTaskColor = (color) => ({
    type: CHANGE_NEWTASK_COLOR,
    payload: color
});
//--------------------------------------------------------------------------------