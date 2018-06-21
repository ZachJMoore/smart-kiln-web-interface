import React, { Component } from "react"
import userDB from "../firebase/firebaseDB"
import swal from "sweetalert"

class ViewSchedules extends Component{
    constructor(props){
        super(props);
        this.state = {
            editItems: false
        }
        this.toggleEditState = ()=>{
            this.state.editItems ? this.setState({editItems: false}) : this.setState({editItems: true})
        }
    }
    render(){
        return (
            <section className="flex-container-center column full-width">
                <section className="view-header">Schedules</section>
                <section className="view-body schedule-dashboard-container flex-container-center column">
                    <button onClick={this.toggleEditState} className="schedule-delete-toggle siimple-btn siimple-btn--grey">Edit</button>
                    <section className="schedule-dashboard-items">
                        {this.props.schedules.map((schedule, index)=><ScheduleItem schedule={schedule} key={index} editItems={this.state.editItems}/>)}
                    </section>
                </section>
            </section>
        )
    }
}

let ScheduleItem = (props)=>{
    return (<section className={props.editItems ? "raised-module schedule-item flex-container column float" : "raised-module schedule-item flex-container column"} >
        {props.editItems && <button onClick={()=>{
            swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this schedule!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        userDB.setSchedule(props.schedule, null)
                        swal("Your schedule has been deleted.", {
                            icon: "success",
                        });
                    } else {
                        swal("Your schedule is safe!");
                    }
                });
        }} className="schedule-item-delete siimple-btn siimple-btn--red"><i className="fas fa-times" /></button>}
        <p>{props.schedule.name}</p>
        <table className="flex-stretch schedule-dashboard-table">
            <tbody>
                <tr>
                    <th>Ramp</th>
                    <th>Rate</th>
                    <th>Target</th>
                    <th>Hold</th>
                </tr>
                {JSON.parse(props.schedule.ramps).map((ramp, index)=>
                    (<tr key={index}>
                        <td>{index + 1}</td>
                        <td>{ramp.rate}</td>
                        <td>{ramp.target}</td>
                        <td>{ramp.hold}</td>
                    </tr>)
                )}
            </tbody>
            
        </table>
    </section>)
}

export default ViewSchedules