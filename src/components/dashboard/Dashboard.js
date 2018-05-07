import React, { Component } from "react";
import { KilnStatus } from "./KilnStatus";

let placeholder = {
    metadata: {
        name: "Uno"
    },
    temp: "82",
    isFiring: true,
    firingProgress: 47,
    currentSchedule: {name: "Basic", default: true},
}
let placeholder2 = {
    metadata: {
        name: "Duo"
    },
    temp: "1230",
    isFiring: true,
    firingProgress: 64,
    currentSchedule: {name: "Crystalline", default: true},
}
let placeholder3 = {
    metadata: {
        name: "Trio"
    },
    temp: "72",
    isFiring: true,
    firingProgress: 12,
    currentSchedule: {name: "Cone 6", default: true},
}

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
                    <KilnStatus kiln={placeholder} />
                    <KilnStatus kiln={placeholder2} />
                    <KilnStatus kiln={placeholder3} />
                </section>
                <section className="dashboard-kilns-container raised-module-light">
                </section>
            </section>
        </div>)
    }
}

export default Dashboard