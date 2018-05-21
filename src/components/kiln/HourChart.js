import React, { Component } from "react"
import Chart from "chart.js"

class HourChart extends Component{
    constructor(props){
        super(props);
        this.initChart = (data, label)=>{
            var chart = new Chart(this.refs.ctx, {
                type: 'line',
                data: {
                    labels: label,
                    datasets: [{
                        data: data,
                        fill: true,
                        borderColor: "#f0eeea",
                        backgroundColor: "#fff5"
                    }]
                },
                options: {
                    animation: {
                        duration: 0
                    },
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: "Hour Chart",
                        fontSize: 16,
                        fontColor: "#f0eeea"
                    },
                    responsive: true,
                    tooltips: {
                        mode: "index",
                        intersect: false,
                        displayColors: false
                    },
                    hover: {
                        mode: "nearest",
                        intersect: true
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false
                            }
                        }]
                    }
                }
            });
        }
    }

    componentDidMount(){
        let data = this.props.data.slice().reverse()
        let label = data.map((temp, index)=>{
            return `${((index*5)+5)}m`
        }).reverse()
        this.initChart(data, label)
    }
    componentDidUpdate(){
        let data = this.props.data.slice().reverse()
        let label = data.map((temp, index)=>{
            return `${((index*5)+5)}m`
        }).reverse()
        this.initChart(data, label)
    }
    render(){
        return(<div className="flex-container-center column hour-chart-container flex-stretch">
            <canvas ref="ctx" className="hour-chart-canvas"></canvas>
        </div>)
    }
}

export default HourChart