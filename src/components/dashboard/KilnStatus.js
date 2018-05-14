import React from "react";
import { Link } from "react-router-dom"

export let KilnStatus = (props)=>{
    return (
        <Link to={props.kiln.metadata.uuid ? `/${props.kiln.metadata.uuid.slice(0,8)}` : "/placeholder"} className="dashboard-status-item-container flex-container flex-stretch column decoration-none">
            <section className="flex-container-center space-between">
                <span className="dashboard-status-text dashboard-status-title">{props.kiln.metadata.name}</span>
                <span className="dashboard-status-text dashboard-status-temp">{props.kiln.temp && props.kiln.temp !== "Offline" ? `${props.kiln.temp}°F` : "Offline"}</span>
                <span className="dashboard-status-text dashboard-status-on-off">{props.kiln.isFiring ? "On" : "Off"}</span>
            </section>
            <section className="flex-container-center flex-stretch">
                <span className="dashboard-status-text dashboard-status-current-schedule">{props.kiln.currentSchedule ? props.kiln.currentSchedule.name : ""}</span>
                <div className="dashboard-status-progress-bar" style={{background: `linear-gradient(90deg, var(--main-light-shade) 0%, var(--main-light-shade) ${props.kiln.firingProgress}%, var(--main-dark-shade) ${props.kiln.firingProgress}%, var(--main-dark-shade) 100%)`}}/>
                <span className="dashboard-status-text dashboard-status-progress-percent">{props.kiln.firingProgress}%</span>
            </section>
        </Link>
    )
}