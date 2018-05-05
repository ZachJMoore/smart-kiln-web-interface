import React, { Component } from "react";

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
                <section className="dashboard-stats-container raised-module-light">
                    {this.props.kilns.map((kiln, index)=>{
                        return (<div className="light-shade" key={index}>
                                {kiln.temp}
                            </div>)
                    })}
                </section>
                <section className="dashboard-kilns-container raised-module-light">
                </section>
            </section>
        </div>)
    }
}

export default Dashboard