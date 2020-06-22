
import settings from './../config'

export const get = (endpoint, authenticated = true) => {
    const url = settings.API_URL + endpoint
    let headers = {}
    if (authenticated) {
        headers = {
            'Authorization': `Bearer ${settings.token}`
        }
    }
    return fetch(url, {
        headers: headers
    }).then(r => {
        if (r.status > 399) {
            throw new Error(r.status)
        }
        return r
    })
    
}


export const login = (endpoint, data={}) => {
    const url = settings.API_URL + endpoint
        
    let headers = {
        
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: headers,
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: new URLSearchParams(data) // body data type must match "Content-Type" header
    }).then(r => {
        if (r.status > 399) {
            throw new Error(r.status)
        }
        return r
    })
    
}