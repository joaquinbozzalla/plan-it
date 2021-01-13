import {
    START_DELETING_TASK, STOP_DELETING_TASK, TASKS,
} from '../../constants';

export const startDeletingTask = () => ({
    type: START_DELETING_TASK,
});
export const stopDeletingTask = () => ({
    type: STOP_DELETING_TASK,
});
export const deleteTaskById = (id) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection(TASKS).doc(id).delete();
    }
};