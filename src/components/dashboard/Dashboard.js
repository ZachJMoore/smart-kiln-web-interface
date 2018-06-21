import React, { Component } from "react";
import { KilnStatus } from "./KilnStatus";

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return (<div className="flex-container ai-center dashboard column">
            <section className="view-header">
                <span className="light-shade">Dashboard</span>
            </section>
            <section className="view-body flex-container ai-center column" >
                <section className="dashboard-status-container column raised-module-light">
                    <span className="flex-container flex-stretch column dashboard-status-container-title">Status</span>
                    {this.props.kilns.map((kiln, index)=><KilnStatus kiln={kiln} key={index} />)}
                </section>
                <section className="dashboard-kilns-container raised-module-light">
                </section>
            </section>
        </div>)
    }
}

export default Dashboard