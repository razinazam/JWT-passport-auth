import React, { Component } from 'react'
import Axios from 'axios'
import { connect } from "react-redux"
import { LOGIN } from "../actioncreator/index"
class Login extends Component {
    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit = (e) => {
        e.preventDefault()
        this.props.LOGIN(this.state)
        // const { email, pswd } = this.state
        // const logindata = { email, pswd }
        // Axios.post("http://localhost:8000/logindata/Login", logindata).then((res) => {
        //     console.log("login api res", res.data);
        // })
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <div class="container">
                    <h2>Login</h2>
                    <form action="/action_page.php">
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" onChange={this.change} />
                        </div>
                        <div class="form-group">
                            <label for="pwd">Password:</label>
                            <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd" onChange={this.change} />
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={this.submit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state }
}
export default connect(mapStateToProps, { LOGIN })(Login)