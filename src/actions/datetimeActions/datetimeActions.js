import {
    SWITCH_SELECTED_DAY,
} from '../../constants';

export const switchSelectedDay = (newDay) => ({
    type: SWITCH_SELECTED_DAY,
    payload: newDay
});
