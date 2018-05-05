import { firebase } from "../firebase/firebase"

let kilnAPI = {
    headers: {},
    getTemp: (url)=>{
        return fetch(`${url}/api/kiln/get-temp`, {
        headers: kilnAPI.headers
        })
    },
    getPackage: (url)=>{
        return fetch(`${url}/api/kiln/get-package`, {
            headers: kilnAPI.headers
        })
    },
    stopFiring: (url)=>{
        return fetch(`${url}/api/kiln/stop-firing`, {
            headers: kilnAPI.headers
        })
    },
    startFiring: (url, schedule)=>{
        return fetch(`${url}/api/kiln/start-firing`, {
            headers: {...kilnAPI.headers, "Content-Type": "application/json"},
            method: "post",
            body: JSON.stringify({schedule: schedule})
        })
    }
}

firebase.auth().onAuthStateChanged(authUser => {
    if (authUser !== null) kilnAPI.headers = {"x-access-token": authUser.uid}
});

export default kilnAPI;