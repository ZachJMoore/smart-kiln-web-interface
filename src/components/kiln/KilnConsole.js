import React, { Component } from "react"
import HourChart from "./HourChart";

class KilnConsole extends Component{
    render(){
        return (<div className="flex-container ai-center dashboard column">
        <section className="view-header">
            <span className="light-shade">{this.props.kiln.metadata.name}</span>
        </section>
        <section className="view-body flex-container ai-center column" >
            {this.props.kiln.tempLog && <HourChart data={this.props.kiln.tempLog}/>}
        </section>
    </div>)
    }
}

export default KilnConsole