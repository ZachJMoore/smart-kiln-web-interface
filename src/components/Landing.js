import React, { Component } from "react"
import { Route, Link, withRouter, Switch } from "react-router-dom"
import * as auth from "../lib/firebase/auth"

class Landing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            isLoading: false,
            error: null
        }
        this.updateState = (event, item) => {
            event.preventDefault()
            let value = event.target.value
            let object = {}
            object[`${item}`] = value
            this.setState(object)
        }
        this.handleLogin = (event) => {
            event.preventDefault()
            
            this.setState({isLoading: true})
            auth.signInUser(this.state.email, this.state.password)
                .then(() => { })
                .catch((error) => {
                    console.error("Error Code: ", error);
                    this.setState({ error: error.code, isLoading: false })
                })
        }
        this.handleSignUp = (event) => {
            event.preventDefault()
            console.log(this.props.history)
            
            this.setState({isLoading: true})
            auth.createUser(this.state.email, this.state.password)
                .then(({user}) => {
                    console.log(user)
                    user.updateProfile({displayName: this.state.name})
                    .then(()=>{
                        console.log("Display Name Updated")
                    })
                    .catch(console.log)
                    this.props.history.push("/")
                })
                .catch((error) => {
                    console.error("Error Code: ", error);
                    this.setState({ error: error.code, isLoading: false })
                })
        }
    }

    render() {
        return (
            <div className="landing-container">
                <div className="content">
                    <Switch>

                        <Route exact path="/sign-up" render={() => {
                            return (
                                <div className="landing-form-container">
                                    <h1>Sign Up</h1>
                                    {this.state.error && <span className="error">{this.state.error}</span>}
                                    <form onSubmit={this.handleSignUp} className="form">
                                        <label htmlFor="name">
                                            Display Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={this.state.name}
                                            onChange={(event) => { this.updateState(event, "name") }}
                                            placeholder="Joe"
                                            required
                                        />
                                        <label htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={this.state.email}
                                            onChange={(event) => { this.updateState(event, "email") }}
                                            placeholder="Joe@email.com"
                                            required
                                        />
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={this.state.password}
                                            onChange={(event) => { this.updateState(event, "password") }}
                                            placeholder="1234567890"
                                            required
                                        />
                                        <button type="submit">Sign Up</button>
                                    </form>
                                    <p>Already have an account? Login <Link to="/" onClick={()=>{this.setState({error: null})}}>here!</Link></p>
                                </div>
                            )
                        }} />

                        <Route render={() => {
                            return (
                                <div className="landing-form-container">
                                    <h1>Login</h1>
                                    {this.state.error && <span className="error">{this.state.error}</span>}
                                    <form onSubmit={this.handleLogin} className="form">
                                        <label htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={this.state.email}
                                            onChange={(event) => { this.updateState(event, "email") }}
                                            placeholder="Joe@email.com"
                                            required
                                        />
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={this.state.password}
                                            onChange={(event) => { this.updateState(event, "password") }}
                                            placeholder="1234567890"
                                            required
                                        />
                                        <button type="submit">Login</button>
                                    </form>
                                    <p>Dont have an account? create one <Link to="/sign-up" onClick={()=>{this.setState({error: null})}}>here!</Link></p>
                                </div>
                            )
                        }} />

                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(Landing)