import React, { Component } from 'react'
import Axios from 'axios'

export default class register extends Component {
    state = {
        error: []
    }
    handelchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handelsubmit = (e) => {
        e.preventDefault()
        const { name, email, pswd, pswd2 } = this.state
        const registerdata = { name, email, pswd, pswd2 }
        console.log("registerdata", registerdata);
        Axios.post("registerdata/register", registerdata).then((res) => {
            console.log("api res", res.data);
            if (res.data.constructor == Array) {
                this.setState({
                    error: res.data
                })
            } else {
                this.setState({
                    data: res.data
                })
            }

        })
    }
    render() {
        console.log("errors", this.state);

        const error = this.state.error.map((res, i) => {
            return (
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    {res.msg}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
        })
        return (
            <div>
                {(error.length) > 0 ? <div>
                    {error}
                </div> : ""}
                <div className="container">
                    <h2>Register</h2>
                    <form >
                        <div className="form-group">
                            <label for="email">name:</label>
                            <input type="text" className="form-control" id="email" placeholder="Enter email" name="name" onChange={this.handelchange} />
                        </div>
                        <div className="form-group">
                            <label for="pwd">Email:</label>
                            <input type="email" className="form-control" id="pwd" placeholder="Enter email" name="email" onChange={this.handelchange} />
                        </div>
                        <div className="form-group">
                            <label for="pwd">Password:</label>
                            <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" onChange={this.handelchange} />
                        </div>
                        <div className="form-group">
                            <label for="pwd">confirm Password:</label>
                            <input type="password" className="form-control" id="pwd" placeholder="Enter confirm password" name="pswd2" onChange={this.handelchange} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.handelsubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
