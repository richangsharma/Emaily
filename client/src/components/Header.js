import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Header extends Component {

    renderConent(){
        switch(this.props.auth){
            case null:
            return;
            case false:
            return <li> <a href="/auth/google"> Log In With Google </a></li>
            default:
            return <li> <a href="/api/logout"> Logout </a></li>
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to={this.props.auth ? '/surveys' : '/'} className="left brand-logo">Emaily</Link>
                    <ul id="nav-mobile" className="right ">
                       {this.renderConent()}
                    </ul>
                </div>
            </nav>

        )
    }
}

function mapStateToProps(state){
        return {auth:state.auth}
}

export default connect(mapStateToProps)(Header);