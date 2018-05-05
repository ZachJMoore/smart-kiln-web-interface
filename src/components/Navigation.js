import React, { Component } from "react";
import * as firebaseAuth from "../firebase/firebaseAuth"
import userDB from "../firebase/firebaseDB"

class Navigation extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount(){
        userDB.getUserName((name)=>{
            this.setState({userName: name})
        })

        // if (!this.props.navCheckbox) return
        this.props.navCheckbox.current.addEventListener("change", ()=>{
            if(this.props.navCheckbox.current.checked) {
                this.setState({navIsChecked: true})
            } else {
                this.setState({navIsChecked: false})
            }
        })
    }

    render(){
        return (
            <nav className="ai-center column space-between">
                <section className="nav-user-container flex-container-center space-around">
                    <img alt="user profile" src={this.props.authUser.photoUrl ? this.props.authUser.photoUrl : "http://via.placeholder.com/350x350"} />
                    <section className="flex-container jc-start column space-around">
                        <h4 className="dark-shade">{this.state.userName}</h4>
                        <small className="half-black">{this.props.authUser.email}</small>
                    </section>
                </section>
                <section className="nav-links-container flex-container-center">
                </section>
                <section className="nav-log-out-container">
                    <button className="siimple-btn half-black" onClick={firebaseAuth.signOutUser} style={{backgroundColor: "#fff0"}}>Log out</button>
                </section>
            </nav>
        )
    }
}

export default Navigation