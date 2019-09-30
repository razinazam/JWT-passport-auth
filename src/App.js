import React, { Component } from 'react'
import Register from "./component/register"
import { Route, withRouter, Redirect } from "react-router-dom"
import Nav from "./component/Nav"
import Login from "./component/Login"
import { connect } from "react-redux"
// import { CheckToken } from "./actioncreator/index"
import Axios from 'axios'
class App extends Component {
  render() {

    // this.props.CheckToken()
    return (
      <div>
        <Nav />
        <Route path="/Login" render={() =>
          this.props.auth == true ? <Redirect to="/" /> : <Login />
        } />
        <Route exact path="/register" component={Register} />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return { ...state }
}
export default withRouter(connect(mapStateToProps)(App))