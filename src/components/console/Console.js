import React, { Component } from "react";
import kilnAPI from "../../kiln-lib/kiln-api";
import { Route } from "react-router-dom";
import Navigation from "../Navigation"
import userDB from "../../firebase/firebaseDB";
import Dashboard from "../dashboard/Dashboard";
import KilnConsole from "../kiln/KilnConsole";

class Console extends Component{
    constructor(props){
        super(props);
        this.state = {
            kilns: [],
            schedules: []
        };
        this.packageIntervals = []
        this.navCheckbox = React.createRef()
        this.mergeKilnPackages = (forceUpdate = false)=>{
            this.state.kilns.forEach((kiln)=>{
                let merge = (data)=>{
                    if (typeof data === typeof ""){
                        this.setState((state)=>{
                            return state.kilns.map((targetKiln)=>{
                                if (kiln.metadata.uuid === targetKiln.metadata.uuid){
                                    targetKiln.temp = data
                                }
                                return targetKiln
                            })
                        })
                    } else if (data) {
                        this.setState((state)=>{
                            return state.kilns.map((targetKiln)=>{
                                if (kiln.metadata.uuid === targetKiln.metadata.uuid){
                                    targetKiln = Object.assign(targetKiln, data)
                                }
                                return targetKiln
                            })
                        })
                    }
                }

                let getData = ()=>{
                kilnAPI.getPackage(kiln.url)
                    .then(res => res.json())
                    .then(data=>{
                        merge(data)
                        
                    })
                    .catch(err=>{
                        console.error(err)
                        merge("Offline")
                    }) 
                }

                if(!kiln.temp || forceUpdate){
                    getData()
                }

                //updated every 60 seconds
                if (forceUpdate === true) return;
                let refresh =
                    setInterval(()=>{
                        getData()
                    },60000)
                this.packageIntervals.push(refresh)
            })
        }
    };

    componentDidMount(){
        userDB.getKilns((kilns)=>{
            this.packageIntervals = []
            this.setState({kilns: kilns}, this.mergeKilnPackages)
        })
        userDB.getSchedules((schedules)=>{
            this.setState({schedules: schedules})
        })
    }

    componentWillUnmount(){
        console.log("Getting rid of these intervals: ", this.packageIntervals)
        this.packageIntervals.forEach(clearInterval)
    }

    render(){
        return (<div className="flex-container">
            <input type="checkbox" id="navCheckbox" ref={this.navCheckbox}/>
            <label htmlFor="navCheckbox" className="nav-button flex-container-center"><i className="fas fa-bars light-shade" /></label>
            <label htmlFor="navCheckbox" className="nav-mobile-dismiss"></label>
            <Navigation authUser={this.props.authUser} navCheckbox={this.navCheckbox}/>
            <main>
                <Route exact path="/" render={()=>{
                    return (<Dashboard kilns={this.state.kilns} />)
                }}/>
                <Route exact path="/placeholder" render={()=>{
                    return <span className="half-white center-snippet">Looks like you found a placeholder link</span>
                }}/>
                {this.state.kilns.map((kiln, index)=>{
                    return (<Route key={index} exact path={`/${kiln.metadata.uuid.slice(0,8)}`} render={()=>{
                        return <KilnConsole kiln={kiln} />
                    }}/>)
                })}
            </main>
        </div>)
    }
}

export default Console