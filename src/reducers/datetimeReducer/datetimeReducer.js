import moment from 'moment';

import {
    SWITCH_SELECTED_DAY, RESET_ALL_DATA,
} from '../../constants';

const today = moment();
today.seconds(0);
today.minutes(0);
today.hours(0);

let timeboxes = [];
for (let i = 0; i < 48; i++) {
    let day = moment();
    day.seconds(0);
    day.minutes((i % 2) * 30);
    day.hours(Math.floor(i / 2));
    timeboxes.push(day.unix());
}

const initialStateDatetime = {
    yesterday: today.clone().subtract(1, 'days').unix(),
    selectedDay: today.unix(),
    tomorrow: today.add(1, 'days').unix(),
    tomorrowEnd: today.hours(23).minutes(59).seconds(59).unix(),
    timeboxes: timeboxes,
}

const datetimeReducer = (state = initialStateDatetime, action = {}) => {
    switch (action.type) {
        case SWITCH_SELECTED_DAY:
            let boxes = [];
            for (let i = 0; i < 48; i++) {
                let day = new moment(action.payload);
                day.seconds(0);
                day.minutes((i % 2) * 30);
                day.hours(Math.floor(i / 2));
                boxes.push(day.unix());
            }
            return { ...state, selectedDay: action.payload.unix(), tomorrow: action.payload.add(1, 'days').unix(), timeboxes: boxes };

        case RESET_ALL_DATA:
            return initialStateDatetime;
        default:
            return state;
    }
}

export default datetimeReducer;