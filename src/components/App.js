import React, { Component } from 'react';
import { firebase }from "../lib/firebase/firebase"
import Dashboard from "./dashboard/Dashboard"
import Landing from './Landing';

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
    if (this.state.authUser === null) return (<Landing />);
    if (this.state.authUser) return (<Dashboard />);
    return null;
  };
}

export default App;
