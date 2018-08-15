import React, { Component } from "react"

class TopBar extends Component{
    render(){
        return (
            <div className="top-bar-container">
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default TopBar