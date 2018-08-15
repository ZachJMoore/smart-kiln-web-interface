import React, { Component } from "react"

class Sidebar extends Component{
    render(){
        return (
            <div className="sidebar-container">
                <div className="sub-container">
                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar