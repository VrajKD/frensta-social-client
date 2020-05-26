import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, LOADING_UI, CLEAR_ERRORS, SET_ERRORS, ADD_SCREAM } from '../types'
import axios from 'axios'

export const getScreams = () => dispatch => {
    dispatch({ type: LOADING_DATA })

    axios.get('/screams')
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
            })
        })
}
// ADD POST

export const addScream = newScream => dispatch => {
    dispatch({ type: LOADING_UI })
    const scr = {
        body: newScream
    }
    axios.post('/scream', scr)
        .then(res => {
            dispatch({
                type: ADD_SCREAM,
                payload: res.data
            })
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch(err => {
            console.log(err.response)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const likeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.error(err))
}

export const unlikeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.error(err))
}

export const deleteScream = (screamId) => dispatch => {
    axios.delete(`/scream/${screamId}`)
        .then(res => {
            dispatch({
                type: DELETE_SCREAM,
                payload: screamId
            })
        })
        .catch(err => console.error(err))
}