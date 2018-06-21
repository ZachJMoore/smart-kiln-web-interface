import React, { Component } from "react"
import HourChart from "./HourChart";
import { Route, Link, withRouter} from "react-router-dom"
import KilnControls from "./KilnControls";

class KilnConsole extends Component{
    render(){
        return (<div className="flex-container ai-center dashboard column">
        <section className="view-header">
            <span className="light-shade">{this.props.kiln.metadata.name} | {this.props.kiln.temp}</span>
        </section>
        <section className="view-body flex-container ai-center column" >
            <section className="kiln-console-tab-container flex-container-center space-between">
                <Link to={`${this.props.match.url}/recent`} className="kiln-console-tab-item light-shade decoration-none">Recent</Link>
                <Link to={`${this.props.match.url}`} className="kiln-console-tab-item light-shade decoration-none">Overview</Link>
                <Link to={`${this.props.match.url}/controls`} className="kiln-console-tab-item light-shade decoration-none">Controls</Link>
            </section>
            <Route exact path={`${this.props.match.url}/recent`} render={()=>{
                return <span className="center-snippet">Recent</span>
            }} />
            <Route exact path={`${this.props.match.url}`} render={()=>{
                return (<div className="flex-stretch">
                    {this.props.kiln.tempLog && <HourChart data={this.props.kiln.tempLog}/>}
                </div>)
            }} />
            <Route exact path={`${this.props.match.url}/controls`} render={()=><KilnControls kiln={this.props.kiln} schedules={this.props.schedules} mergeKilnPackages={this.props.mergeKilnPackages}/>} />
        </section>
    </div>)
    }
}

export default withRouter(KilnConsole)