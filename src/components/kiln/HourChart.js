import React, { Component } from "react"

class HourChart extends Component{
    render(){
        return(<ul className="flex-container-center flex-stretch flex-wrap" style={{listStyle: "none", padding: "0"}}>
            {this.props.data.map((data, index)=>{
                return <li key={index} className="light-shade" style={{margin: "5px"}}>{data}</li>
            })}
        </ul>)
    }
}

export default HourChart