import {
    LOAD_TASKS_SUCCESS, LOAD_TASKS_LOADING, LOAD_TASKS_FAILURE,
} from '../../constants';

export const loadTasksSuccess = tasks => ({
    type: LOAD_TASKS_SUCCESS,
    payload: tasks
});
export const loadTasksLoading = () => ({
    type: LOAD_TASKS_LOADING
});
export const loadTasksFailure = error => ({
    type: LOAD_TASKS_FAILURE,
    payload: {
        error
    }
});

export const loadTasks = () => {
    return (dispatch) => {
        dispatch(loadTasksLoading());

        watchTasks((tasks) => {
            this.setState({ tasks });
            tasks.map(task => {
                let timeboxesColors = [...this.state.timeboxesColors];
                console.log(task);
                for (let i = 0; i < timeboxesColors.length; i++) {
                    if (task['from'] <= i && i <= task['to']) {
                        timeboxesColors[i] = task['color'];
                    }
                }

                this.setState({ timeboxesColors });
            });
        });
        Axios.get('clientById', {
            params: {
                clientId: id
            },
        }).then((res) => {
            const client = res.data;
            dispatch(loadTasksSuccess(client));
        }).catch(err => {
            dispatch(loadTasksFailure(err.message));
        });
    };
};