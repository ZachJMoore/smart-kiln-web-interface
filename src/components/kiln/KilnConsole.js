import React, { Component } from "react"
import HourChart from "./HourChart";
import { Route, Link, withRouter} from "react-router-dom"

class KilnConsole extends Component{
    render(){
        return (<div className="flex-container ai-center dashboard column">
        <section className="view-header">
            <span className="light-shade">{this.props.kiln.metadata.name}</span>
        </section>
        <section className="view-body flex-container ai-center column" >
            <section className="siimple-tabs flex-container-center space-around">
                <Link to={`${this.props.match.url}/recent`} className="siimple-tabs-tab light-shade decoration-none">Recent</Link>
                <Link to={`${this.props.match.url}`} className="siimple-tabs-tab light-shade decoration-none">Overview</Link>
                <Link to={`${this.props.match.url}/controls`} className="siimple-tabs-tab light-shade decoration-none">Controls</Link>
            </section>
            <Route exact path={`${this.props.match.url}/recent`} render={()=>{
                return <span className="center-snippet">Recent</span>
            }} />
            <Route exact path={`${this.props.match.url}`} render={()=>{
                return (<div className="flex-stretch">
                    {this.props.kiln.tempLog && <HourChart data={this.props.kiln.tempLog}/>}
                </div>)
            }} />
            <Route exact path={`${this.props.match.url}/controls`} render={()=>{
                return <span className="center-snippet">Controls</span>
            }} />
        </section>
    </div>)
    }
}

export default withRouter(KilnConsole)