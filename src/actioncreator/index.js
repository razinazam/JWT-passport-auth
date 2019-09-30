import Axios from "axios"
import * as types from "../types/index"
import JWT from "jsonwebtoken"
export const LOGIN = (e) => {
    return (dispatch) => {
        let { email, pswd } = e
        let logindata = { email, pswd }
        Axios.post("/logindata/Login", logindata).then((res) => {
            let Token = res.data.token
            localStorage.clear("")
            localStorage.setItem("token", Token)
            if (Token) {
                Axios.defaults.headers.common["Authorization"] = Token
            } else {
                delete Axios.defaults.headers.common["Authorization"];
            }
            dispatch(getcurrentuser())

        }).catch(err => {
            console.log(err);

        })
    }
}


export const getcurrentuser = () => dispatch => {
    Axios.get("/logindata/me").then(resp => {
        dispatch({
            type: types.currentUser,
            payload: resp.data
        })

    })
}

// export const CheckToken = () => {
//     return (dispatch) => {
//         let token = localStorage.getItem("token")
//         if (token) {
//             JWT.verify(token, "config", (err, response) => {
//                 Axios.post("http://localhost:8000/logindata/checktoken", { id: response.id }).then((res) => {
//                     dispatch({
//                         type: types.TokenVerify,
//                         payload: res.data
//                     })
//                 })

//             })
//         }
//     }
// }
export const Logout = (props) => {
    return (dispatch) => {
        localStorage.clear("")
        console.log("logout", props)
        props.history.push("/register")
        dispatch({
            type: types.LOGOUT
        })
    }
}
