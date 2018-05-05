import React, { Component } from 'react';
import { firebase }from "../firebase/firebase"
import Login from "./Login"
import Console from "./console/Console"
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      authUser: undefined,
      isLoading: true,
    }
  };

  componentDidMount(){
    this.setState({isLoading: false})
    firebase.auth().onAuthStateChanged(authUser=>{
      this.setState({authUser: authUser})
    })
  };

  render() {
    if (this.state.isLoading) return null;
    if (this.state.authUser === null) return (<Login />);
    if (this.state.authUser) return (<Console authUser={this.state.authUser} />);
    return null;
  };
}

export default App;
