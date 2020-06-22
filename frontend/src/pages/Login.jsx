import React, {useState} from 'react'
import {login, get} from './../Network/client'
import {Redirect} from 'react-router-dom'

const LoginView = (props) => {
    const [username, setUsername] = useState('jakob')
    const [password, setPassword] = useState('password')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const doLogin = () => {
        setLoading(true)
        login('/users/token/', {username, password}).then(r => {
            if (r.status !== 200) {
                throw new Error("credentials")
            }
            return r
        }).then(r => r.json()).then(r => {
            localStorage.setItem('accessToken', r.access_token)
            return r
        }).then(r => {
            return get('/users/u/me/')
        }).then(r => {
            if (r.status !== 200) {
                throw new Error("user")
            }
            return r
        }).then(r => r.json()).then(r => {
            localStorage.setItem('user_id', r.user_id)
            setRedirect(true)
            return r
        }).catch(err => {
            console.log(err)
            setLoading(false)
            setError(true)
        })
    }

    if (redirect) {
        return <Redirect to={'/app'} />
    }

    if (loading) {
        return <div>
            loading...
        </div>
    }

    let errorText = <div></div>
    if (error) {
        errorText = <div>Feil brukernavn eller passord</div>
    }

    return <div>
        {errorText}
        <input type={'text'} value={username} onChange={e => setUsername(e.target.value)} />
        <input type={'password'} value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={doLogin}>Login</button>
    </div>
}

export default LoginView