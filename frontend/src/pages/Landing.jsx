import React from 'react'
import {Link} from 'react-router-dom'

const Landing = () => {

    const loggedIn = () => {
        return localStorage.getItem('accessToken') !== null && localStorage.getItem('user_id') !== null
    }
    
    return <div>
        {loggedIn() ? <Link to={'/app'}>Min side</Link> : <Link to={'/login'}>Logg inn</Link>}
    </div>
}

export default Landing