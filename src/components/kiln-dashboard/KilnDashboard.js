import React, { Component } from "react";
import Plot from 'react-plotly.js';

class KilnDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            graph : {
                x: [0],
                y: [0]
            }
        }

        this.updateGraph = () =>{
            if (this.props.kiln.tempLog && JSON.stringify(this.props.kiln.tempLog.slice().reverse()) !== JSON.stringify(this.state.graph.y)){

                let tempLog = this.props.kiln.tempLog

                let y = tempLog.slice().reverse()
                let x = tempLog.map((temp, index)=>{return `${(index*5)}`})

                this.setState({graph:{
                    x: x,
                    y: y
                }})
            }
        }
    }

    componentDidMount() {

        this.updateGraph()

    }

    componentDidUpdate(){

        this.updateGraph()

    }

    render() {

        let { kiln, getTemp } = this.props

        return (
            <div className="kiln-dashboard-container">
                <h1 className="title">{kiln.metadata.name}</h1>
                <div className="content">
                    <div className="temperature">{getTemp(kiln)}</div>
                    {/* <div className="graph" ref={"graph"}></div> */}
                    <Plot
                        data={[
                        {
                            x: this.state.graph.x,
                            y: this.state.graph.y,
                            type: 'scatter',
                        }
                        ]}
                        className="graph"
                    />
                </div>
            </div>
        )
    }
}

export default KilnDashboard