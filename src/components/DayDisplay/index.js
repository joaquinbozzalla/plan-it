import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment';
import { Container, IconButton, } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import {
    switchSelectedDay,
} from '../../actions';
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
    arrowButton: {

    },
}));

function DayDisplay(props) {
    const classes = useStyles();
    const { selectedDay, switchSelectedDay, } = props;

    const formatDay = (day) => {
        day = moment.unix(day);
        const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

        let str = daysOfWeek[day.day()] + ' ' + day.date() + ' de ' + months[day.month()] + ' del ' + day.year();

        return str;
    }

    const isDayAvailable = (newDay) => {
        const today = moment().date();
        if (Math.abs(today - newDay.date()) <= 1) {
            return true;
        }
        return false;
    }

    const yesterday = (today) => {
        today = moment.unix(today);
        let newDay = moment(today).subtract(1, 'days');
        newDay.seconds(0);
        newDay.minutes(0);
        newDay.hours(0);

        if (isDayAvailable(newDay) === true) {
            return newDay;
        }
        return today;
    }

    const tomorrow = (today) => {
        today = moment.unix(today);
        let newDay = moment(today).add(1, 'days');
        newDay.seconds(0);
        newDay.minutes(0);
        newDay.hours(0);
        
        if (isDayAvailable(newDay) === true) {
            return newDay;
        }
        return today;
    }



    return (
        <Container className={classes.root}>
            {
                yesterday(selectedDay).unix() !== selectedDay
                    ? <IconButton
                        color="inherit"
                        aria-label="Yesterday"
                        onClick={() => switchSelectedDay(yesterday(selectedDay))}
                        edge="start"
                        className={classes.arrowButton}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                    : null

            }

            <h1>{formatDay(selectedDay)}</h1>

            {
                tomorrow(selectedDay).unix() !== selectedDay
                    ? <IconButton
                        color="inherit"
                        aria-label="Yesterday"
                        onClick={() => switchSelectedDay(tomorrow(selectedDay))}
                        edge="start"
                        className={classes.arrowButton}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                    : null
            }

        </Container>

    );
}

const mapStateToProps = state => {
    return {
        selectedDay: state.datetimeReducer.datetimeReducer.selectedDay,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        switchSelectedDay: (newDay) => dispatch(switchSelectedDay(newDay)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DayDisplay);