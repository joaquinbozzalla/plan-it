import {
    LOAD_TASKS_SUCCESS, LOAD_TASKS_LOADING, LOAD_TASKS_FAILURE,
    RESET_ALL_DATA,
} from '../../constants';

const initialStateTask = {
    tasks: [],
    loadingTasks: false,
}

const loadReducer = (state = initialStateTask, action = {}) => {
    switch (action.type) {
        case LOAD_TASKS_SUCCESS:
            return { ...state, tasks: action.payload, loadingTasks: false };
        case LOAD_TASKS_LOADING:
            return { ...state, loadingTasks: true };
        case LOAD_TASKS_FAILURE:
            return { ...state, loadingTasks: false };
        case RESET_ALL_DATA:
            return initialStateTask;
        default:
            return state;
    }
}

export default loadReducer;