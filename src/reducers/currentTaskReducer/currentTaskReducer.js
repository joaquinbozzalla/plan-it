import moment from 'moment';

import { START_NEW_TASK, TICK_TASK, CLEAN_CURRENT_TASK,
    RESET_ALL_DATA,
} from '../../constants';

const initialStateCurrentTask = {
    currentTask: "",
    timeElapsed: moment.duration(0),
    timeLeft: moment.duration(0),
}

const currentTaskReducer = (state = initialStateCurrentTask, action = {}) => {
    switch (action.type) {
        case START_NEW_TASK:
            return { ...state, currentTask: action.payload.name, timeLeft: moment.duration(action.payload.duration), timeElapsed: moment.duration(0) };
        case TICK_TASK:
            return { ...state, timeLeft: state.timeLeft.subtract(1, 's'), timeElapsed: state.timeElapsed.add(1, 's') };
        case CLEAN_CURRENT_TASK:
            return initialStateCurrentTask;
        case RESET_ALL_DATA:
            return initialStateCurrentTask;
        default:
            return state;
    }
}

export default currentTaskReducer;