import * as types from "../types/index"
const initstate = {
    auth: false
}
export const reducer = (state = initstate, action) => {
    if (action.type == types.LoginToken) {
        return {
            ...state,
            auth: true
        }
    }
    if (action.type == types.currentUser) {
        const data = action.payload
        return {
            ...state,
            auth: true,
            email: data.email,
            name: data.name
        }

    }
    if (action.type == types.LOGOUT) {
        return {
            ...state,
            auth: false
        }
    }
    return { ...state }
}
