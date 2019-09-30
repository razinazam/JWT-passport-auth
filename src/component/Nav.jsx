import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Logout } from "../actioncreator/index"
import { withRouter } from "react-router-dom"
class Nav extends Component {
    NAVul(props) {
        if (this.props.auth == false) {
            return (
                <React.Fragment>
                    <li class="nav-item">
                        <Link to="/Register" class="nav-link">Register <span class="sr-only">(current)</span></Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/login" class="nav-link" > Login </Link>
                    </li>

                </React.Fragment>
            )
        } else {
            return (
                <li class="nav-item">
                    <Link to="" class="nav-link" href="#" onClick={() => { this.props.Logout(this.props) }}>{this.props.name}</Link>
                </li>
            )
        }
    }
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">

                            {this.NAVul()}
                            {/* <li class="nav-item ">
                                <Link to="/Register" class="nav-link" href="#">Register <span class="sr-only">(current)</span></Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/Login" class="nav-link" href="#">login</Link>
                            </li> */}

                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}
export default connect(mapStateToProps, { Logout })(withRouter(Nav))