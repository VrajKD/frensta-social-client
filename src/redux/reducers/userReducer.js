import { SET_ERRORS, SET_USER, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_SCREAM, UNLIKE_SCREAM } from '../types'

const INITIAL_STATE = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        // case SET_ERRORS:
        //     return ({
        //         ...state,
        //         errors: action.payload
        //     })
        // case CLEAR_ERRORS:
        //     return ({...state,
        //     errors  })

        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return INITIAL_STATE
        case SET_USER: return {
            authenticated: true,
            loading: false,
            ...action.payload
        }
        case LOADING_USER: return {
            ...state,
            loading: true
        }
        case LIKE_SCREAM: return ({
            ...state,
            likes: [
                ...state.likes,
                {
                    userHandle: state.credentials.handle,
                    screamId: action.payload.screamId
                }
            ]
        })

        case UNLIKE_SCREAM: return ({
            ...state,
            likes: state.likes.filter(like => like.screamId !== action.payload.screamId)

        })

        default: return state
    }
}