import {
    START_NEW_TASK, TICK_TASK, CLEAN_CURRENT_TASK,
} from '../../constants';

export const startNewTask = (name, duration) => ({
    type: START_NEW_TASK,
    payload: { name, duration },
});

export const tickTask = () => ({
    type: TICK_TASK
});

export const cleanCurrentTask = () => ({
    type: CLEAN_CURRENT_TASK
});
