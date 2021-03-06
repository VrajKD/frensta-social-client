import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, ADD_SCREAM, SUBMIT_COMMENT, SET_SCREAM } from '../types'

const INITIAL_STATE = {
    screams: [],
    scream: {},
    loading: false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_SCREAMS: return ({
            ...state,
            loading: false,
            screams: action.payload
        })

        case LOADING_DATA: return ({
            ...state,
            loading: true
        })

        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId)
            state.screams[index] = action.payload
            if (state.scream.screamId === action.payload.screamId) {
                state.scream = action.payload
            }
            return ({
                ...state
            })
        case DELETE_SCREAM:
            let ind = state.screams.findIndex(scream => scream.screamId === action.payload)
            state.screams.splice(ind, 1);
            return ({
                ...state
            })
        case ADD_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [action.payload, ...state.scream.comments]
                }
            }
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            }
        default: return state
    }
}