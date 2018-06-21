import React, { Component } from "react";
import userDB from "../firebase/firebaseDB"
import { withRouter } from "react-router-dom"

let emptyRamp = {
    rate: "",
    target: "",
    hold: ""
}

class AddSchedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            schedule: [{...emptyRamp}]
        }
        this.updateRamp = (index, event, segment)=>{
            let value = event.target.value
            this.setState((oldState)=>{
                oldState.schedule[index][`${segment}`] = value
                return oldState
            })
        }
        this.removeRamp = (index, event)=>{
            event.preventDefault()
            this.setState(oldState=>{
                oldState.schedule.splice(index, 1)
                return oldState
            })
        }
        this.addRamp = (event)=>{
            event.preventDefault()
            this.setState(oldState=>{
                oldState.schedule.push({...emptyRamp})
                return oldState
            })
        }
        this.moveRamp = (index, direction, event)=>{
            event.preventDefault()
            this.setState(oldState=>{
                let ramp = oldState.schedule[index]
                oldState.schedule.splice(index, 1)
                oldState.schedule.splice(index + direction, 0, ramp)
                return oldState
            })
        }
        this.nameExists = (name) => {
            let nameExists = false;
            let schedules = this.props.schedules
            if (!schedules.length) return nameExists
            for (let i = 0; i < schedules.length; i++){
                let normalize = (text)=>{
                    text = text.toString().toLowerCase().replace(/[^0-9a-z-]/g,"")
                    text = text.replace(/\s/g, '');
                    return text
                }
                normalize(schedules[i].name) === normalize(name) ? nameExists = true : nameExists = false;
                if (nameExists) break;
            }
            return nameExists
        }
        this.changeName = (event)=>{
            let value = event.target.value
            this.setState({name: value, nameExists: this.nameExists(value)})
        }
        this.submitSchedule = (event)=>{
            event.preventDefault()
            //construct and concat
            let schedule = {
                id: Math.floor(Math.random() * Math.pow(100, 10)).toString(16),
                date: Date.now(),
                name: this.state.name,
                ramps: this.state.schedule
            }
            userDB.setSchedule(schedule)
            this.props.history.push(`/schedules`)
        }
    }

    render(){
        return (
            <div className="flex-container-center add-schedule column flex">
                <section className="view-header flex-container-center">Add Schedule</section>
                <section className="view-body ai-center flex-container column">
                    <form className="add-schedule-form" onSubmit={this.submitSchedule}>
                        <section className="add-schedule-form-header">
                            <input
                            onChange={this.changeName}
                            placeholder="Schedule Name..."
                            required
                            value={this.state.name}
                            className="add-schedule-name siimple-input"
                            />
                            {this.state.nameExists && <p className="add-schedule-warning-text">A similar name already exists...</p>}
                        </section>
                        <section className="flex-container column flex-stretch">
                            {this.state.schedule.map((ramp, index)=>(<Row ramp={ramp} index={index} key={index} updateRamp={this.updateRamp} removeRamp={this.removeRamp} moveRamp={this.moveRamp}/>))}
                            <section className="schedule-button-container">
                                <button onClick={this.addRamp} className="add-ramp-button siimple-btn siimple-btn--grey">
                                    <i className="fas fa-plus" />
                                </button>
                                <button type="submit" className="add-schedule-submit siimple-btn siimple-btn--grey">
                                    Add Schedule
                                </button>
                            </section>
                        </section>
                    </form>
                </section>
            </div>
        )
    }
}

let Row = (props)=>{
    return (
        <section className="add-schedule-row">
            <section className="add-schedule-row-index">
                <button className="schedule-remove-row-button siimple-btn siimple-btn--grey" onClick={(event)=>{props.removeRamp(props.index, event)}}>
                    <i className="fas fa-times" />
                </button>
                <span className="add-schedule-row-index-text text-center">{props.index + 1}</span>
            </section>
            <section className="add-schedule-row-input-container">
                <input
                    onChange={(event)=>{props.updateRamp(props.index, event, "rate")}}
                    type="number"
                    pattern="-?[0-9]*(\.[0-9]+)?"
                    error="Input must be a number"
                    required
                    placeholder="Rate..."
                    value={props.ramp.rate}
                    className="add-schedule-row-input-item siimple-input"
                />
                <input
                    onChange={(event)=>{props.updateRamp(props.index, event, "target")}}
                    type="number"
                    pattern="-?[0-9]*(\.[0-9]+)?"
                    error="Input must be a number"
                    required
                    placeholder="Target..."
                    value={props.ramp.target}
                    className="add-schedule-row-input-item siimple-input"
                />
                <input
                    onChange={(event)=>{props.updateRamp(props.index, event, "hold")}}
                    pattern="-?[0-9]*(\.[0-9]+)?"
                    type="number"
                    error="Input must be a number"
                    required
                    placeholder="Hold..."
                    value={props.ramp.hold}
                    className="add-schedule-row-input-item siimple-input"
                />
            </section>
            <section className="add-schedule-row-move-controls">
                <button className="move-row-button siimple-btn siimple-btn--grey" onClick={(event)=>{props.moveRamp(props.index, -1, event)}}>
                    <i className="fas fa-angle-up" />
                </button>
                <button className="move-row-button siimple-btn siimple-btn--grey" onClick={(event)=>{props.moveRamp(props.index, 1, event)}}>
                    <i className="fas fa-angle-down" />
                </button>
            </section>
        </section>
    )
}

export default withRouter(AddSchedule);