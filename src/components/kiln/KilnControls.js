import React, { Component } from "react"
import kilnAPI from "../../kiln-lib/kiln-api"

class KilnControls extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentSelection: 0,
            waiting: false
        }
        this.changeSelection = (event)=>{
            let value = event.target.value
            this.setState({currentSelection: value})
        }
        this.handleStart = ()=>{
            if (this.state.currentSelection === 0){
                alert("Please choose a schedule first")
                return
            }
            this.setState({waiting: true},()=>{

                this.props.schedules.map(schedule=>{
                    if (this.state.currentSelection === schedule.id){
                        console.log(schedule.name)
                        kilnAPI.startFiring(this.props.kiln.url, schedule).then(()=>{
                            console.log("Kiln started")
                            this.setState({waiting: false})
                        })
                        return
                    }
                })
            })

            
        }
        this.handleStop = ()=>{
            this.setState({waiting: true})
            kilnAPI.stopFiring(this.props.kiln.url).then(()=>{
                this.setState({currentSelection: 0})
                console.log("kiln stopped")
                this.setState({waiting: false})
            })
            
        }
    }

    render(){
        return(
            <div className="kiln-controls raised-module-light flex-container column">
                <div className="kiln-controls-waiting" waiting={`${this.state.waiting}`}>
                    <div className="siimple-spinner siimple-spinner--grey siimple-spinner--large" />
                </div>
                <p className="kiln-controls-text">Kiln Controls</p>
                <p className="kiln-controls-text">Kiln is currently {this.props.kiln.isFiring? "on":"off"}</p>
                
                <select disabled={this.state.waiting} value={this.state.currentSelection} onChange={this.changeSelection} className="siimple-select kiln-controls-select">
                    <option value={0} disabled>Select Schedule</option>
                    {this.props.schedules.map(((schedule, index)=>
                        <option value={schedule.id} key={index}>{schedule.name}</option>
                    ))}
                </select>
                <button disabled={this.state.waiting} className="siimple-btn kiln-controls-button" onClick={this.handleStart}>
                    Start kiln
                </button>
                <button disabled={this.state.waiting} className="siimple-btn kiln-controls-button" onClick={this.handleStop}>
                    Stop kiln
                </button>
            </div>
        )
    }
}
export default KilnControls