import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { getInitialData } from '../utils/api';
import { pullUsers } from './users';
import { pullQuestions } from './questions';

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(pullUsers(users));
                dispatch(pullQuestions(questions));
                dispatch(hideLoading());
            })
    }
}