import moment from 'moment';
import {
    START_SELECTING_TASK,
    UPDATE_SELECTING_TASK,
    STOP_SELECTING_TASK,
    RESET_ALL_DATA,
    START_CREATING_TASK,
    STOP_CREATING_TASK,
    CHANGE_NEWTASK_CATEGORY,
    CHANGE_NEWTASK_NAME,
    CHANGE_NEWTASK_DESCRIPTION,
    CHANGE_NEWTASK_ICON,
    CHANGE_NEWTASK_COLOR,
} from '../../constants';

const initialStateTask = {
    newTaskFrom: undefined,
    newTaskTo: undefined,
    newTaskFromTimestamp: undefined,
    newTaskToTimestamp: undefined,
    selectingNewTask: false,
    newTaskDialogOpened: false,
    newTaskCategory: '',
    newTaskName: '',
    newTaskDescription: '',
    newTaskIcon: '',
    newTaskColor: '',
}

const createReducer = (state = initialStateTask, action = {}) => {
    switch (action.type) {
        case START_SELECTING_TASK:
            return { ...state, selectingNewTask: true, newTaskFrom: action.payload.from, newTaskFromTimestamp: action.payload.fromTimestamp, newTaskTo: action.payload.from, newTaskToTimestamp: moment(action.payload.fromTimestamp * 1000).add(30, 'minutes').unix()};
        case UPDATE_SELECTING_TASK:
            return { ...state, newTaskFrom: action.payload.from, newTaskFromTimestamp: action.payload.fromTimestamp, newTaskTo: action.payload.to, newTaskToTimestamp: action.payload.toTimestamp };
        case STOP_SELECTING_TASK:
            return { ...state, selectingNewTask: false, };
        case START_CREATING_TASK:
            return { ...state, newTaskDialogOpened: true, newTaskCategory: '', newTaskName: '', newTaskDescription: '', newTaskIcon: '', newTaskColor: '', };
        case STOP_CREATING_TASK:
            return initialStateTask;
        case CHANGE_NEWTASK_CATEGORY:
            return { 
                ...state,
                newTaskCategory: action.payload,
                newTaskColor: action.payload && action.payload['color'] ? action.payload['color'] : state.newTaskColor,
                newTaskIcon: action.payload && action.payload['icon'] ? action.payload['icon'] : state.newTaskIcon,
            };
        case CHANGE_NEWTASK_NAME:
            return { ...state, newTaskName: action.payload };
        case CHANGE_NEWTASK_DESCRIPTION:
            return { ...state, newTaskDescription: action.payload };
        case CHANGE_NEWTASK_ICON:
            return { ...state, newTaskIcon: action.payload };
        case CHANGE_NEWTASK_COLOR:
            return { ...state, newTaskColor: action.payload };

        case RESET_ALL_DATA:
            return initialStateTask;
        default:
            return state;
    }
}

export default createReducer;