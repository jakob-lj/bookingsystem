
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