import React, { Component } from "react"

class Body extends Component{
    render(){
        return (
            <div className="body-container">
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Body