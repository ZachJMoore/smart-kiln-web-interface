import { firebaseDB } from "./firebase";
import { firebase } from "./firebase";

let authUser = null;
let userPath = ""

firebase.auth().onAuthStateChanged(user => {
    if (user !== null) {
        authUser = user
        userPath = `users/${user.uid}`
    } else {
        console.log("user signed out")
    }
})

let objectToArray = (object)=>{
    return Object.keys(object).map(key=>{
        return object[key]
    })
}

const userDB = {
    setUserName: (data, user = authUser)=>{
        if (user === null) return;
        firebaseDB.ref(`${userPath}/name`).set(data)
    },
    getUserName: (callback)=>{
        firebase.database().ref(`${userPath}/name`).once("value", (name)=>{
            callback(name.val())
        })
    },
    getKilns: (callback)=>{
        firebase.database().ref(`${userPath}/kilns`).on("value", (kilns)=>{
            let array = objectToArray(kilns.val())
            callback(array)
        })
    },
    getSchedules: (callback)=>{
        firebase.database().ref(`${userPath}/schedules`).on("value", (schedules)=>{
            let array = objectToArray(schedules.val())
            callback(array)
        })
    },
    setSchedule: (schedule, data)=>{
        schedule.ramps = JSON.stringify(schedule.ramps)
        let placeholder;
        data !== undefined ? placeholder = data : placeholder = schedule
        firebase.database().ref(`${userPath}/schedules/${schedule.id}`).set(placeholder)
    }
}

export default userDB;