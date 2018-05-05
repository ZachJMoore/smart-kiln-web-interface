import React, { Component } from "react";
import * as firebaseAuth from "../firebase/firebaseAuth"

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            emailField: "",
            passwordField: "",
            isloading: false,
            error: undefined,
            createAccount: false
        };
        this.handleEmailChange = (e)=>{
            this.setState({emailField: e.target.value})
        }
        this.handlePasswordChange = (e)=>{
            this.setState({passwordField: e.target.value})
        }
        this.handleLogin = (e)=>{
            e.preventDefault()
            this.setState({isloading: true})
            firebaseAuth.signInUser(this.state.emailField, this.state.passwordField)
            .then(user => {
                
            })
            .catch(error=>{
                console.error("Error Code: ", error.code);
                console.error("Error Message: ", error.message);
                this.setState({error: error, isloading: false})
            })
        }
        this.handleCreateAccountAction = ()=>{
            this.setState({createAccount: true})
        }
    };
    render(){
        if (this.state.isloading) return (<div className="app-loading"/>)
        if (this.state.createAccount){
            return (
                <div className="flex-container-center column" style={{height: "100vh"}}>
                    <p className="light-shade text-center">Sorry, but we are not currently taking new users.</p>
                    <p className="light-shade text-center">To request an account please contact Zach Moore at <a href="mailto:get3moore@gmail.com" className="light-shade">Get3Moore@Gmail.com</a></p>
                    <button className="siimple-btn light-shade-background" onClick={()=>{this.setState({createAccount: false})}}>Return</button>
                </div>
            )
        }
        return (<div className="flex-container-center column login-page">
            <h2 className="light-shade">Smart Kiln</h2>
            {this.state.error && <p className="light-shade">{this.state.error.code}</p>}
            <form onSubmit={this.handleLogin} className="login-form flex-container-center column">
                <input 
                    type="email" 
                    required
                    value={this.state.emailField} 
                    onChange={this.handleEmailChange} 
                    placeholder="Email..." 
                    className="login-input siimple-input flex-stretch light-shade-background dark-shade"
                />
                <input 
                    type="password" 
                    required
                    value={this.state.passwordField}
                    onChange={this.handlePasswordChange} 
                    placeholder="Password..." 
                    className="login-input siimple-input flex-stretch light-shade-background dark-shade"
                />
                <button 
                    className="login-button siimple-btn flex-stretch light-shade-background" 
                    type="submit">
                    Login
                </button>
            </form>
            <small><a href="#" className="half-white" onClick={this.handleCreateAccountAction}>Dont have an account? <i className="fas fa-question-circle" /></a></small>
        </div>)
    }
}

export default Login