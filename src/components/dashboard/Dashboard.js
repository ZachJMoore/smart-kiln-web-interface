import React, { Component } from "react"
import { Route, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Body from "./Body";
import TopBar from "./TopBar";

import { firebase } from "../../lib/firebase/firebase"
import database from "../../lib/firebase/database"
import kilnAPI from "../../lib/kiln/kilnAPI"
import KilnDashboard from "../kiln-dashboard/KilnDashboard";


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authUser: null,
            isFahrenheit: true,
            kilns: [],
            schedules: []
        }

        this.updateKiln = (kiln) => {
            kilnAPI.getPackage(kiln.url)
                .then(res => res.json())
                .then((data) => {

                    let newKilns = this.state.kilns.map((targetKiln) => {
                        if (kiln.metadata.uuid === targetKiln.metadata.uuid) {
                            return Object.assign(targetKiln, data)
                        }
                        return targetKiln
                    })

                    this.setState({ kilns: newKilns })
                })
                .catch((error) => {
                    console.log(error)
                    let newKilns = this.state.kilns.map((targetKiln) => {
                        if (kiln.metadata.uuid === targetKiln.metadata.uuid) {
                            return Object.assign(targetKiln, {
                                temp: null
                            })
                        }
                        return targetKiln
                    })

                    this.setState({ kilns: newKilns })
                })
        }

        this.fahrenheitToCelsius = (fahrenheit) => {
            return (
                parseFloat(((fahrenheit - 32) * .5556).toFixed(2))
            )
        }

        this.getTemp = (kiln)=>{
            return (kiln.temp === undefined ? <div className="loader sm"></div> : kiln.temp === null ? "Offline" : this.state.isFahrenheit ? kiln.temp + "ºF" : this.fahrenheitToCelsius(kiln.temp) + "ºC")
        }
    }

    componentDidMount() {
        this.authStateListener = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ authUser: user })
            } else {
            }
        });

        database.getKilns((kilns) => {
            this.setState({ kilns: kilns })
            kilns.forEach(this.updateKiln)
        })
        database.getSchedules((schedules) => { this.setState({ schedules: schedules }) })

        this.kilnUpdateInterval = setInterval(() => {
            this.state.kilns.forEach(this.updateKiln)
        }, 30000)
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        this.authStateListener()
        clearInterval(this.kilnUpdateInterval)
    }

    render() {
        return (
            <div className="dashboard-container">
                <Route render={({ location }) =>

                    (<>
                        <TopBar>
                            <span className="title">SmartKiln</span>
                        </TopBar>
                        <Sidebar>
                            <div className="title">Kilns</div>
                            {this.state.kilns.map((kiln, index) => <KilnQuickView getTemp={this.getTemp} pathname={location.pathname} key={index} kiln={kiln} />)}
                        </Sidebar>
                        <Body>
                            {this.state.kilns.map((kiln, index) => <Route key={index} path={ "/" + kiln.metadata.uuid.slice(0, 18)} render={() => <KilnDashboard getTemp={this.getTemp} kiln={kiln} />} />)}
                        </Body>
                    </>)

                } />
            </div>
        )
    }
}

let KilnQuickView = ({ kiln, isFahrenheit, pathname, getTemp }) => {
    return (
        <Link to={ "/" + kiln.metadata.uuid.slice(0, 18)} className={"kiln-quick-view " + (pathname.slice(1) === kiln.metadata.uuid.slice(0, 18) && "active")}>
            <span className="title">{kiln.metadata.name}</span>
            <section className="content">
                <div className="temperature">{getTemp(kiln)}</div>
                <div className={"on-off " + (kiln.isFiring ? "on" : "off")}></div>
            </section>
        </Link>
    )
}

export default Dashboard