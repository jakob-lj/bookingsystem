

import React, {useEffect, useState} from 'react'
import {get, post} from './../Network/client'
import {Link} from 'react-router-dom'
import NetworkIssue from './../ErrorHandling/NetworkIssue'
import Modal from './../components/Modal'

const Home = (props) => {
    const [projects, setProjects] = useState(undefined)
    const [error, setError] = useState(null)

    useEffect(() => {
        get('/project/').then(r => r.json()).then(r => {
            setProjects(r)
        }).catch(err => {
            setError(err)
        })
    }, [])


    if (projects === undefined && !error) {
        return <div>Loading...</div>
    }

    if (error) {
        return <NetworkIssue error={error} />
    }

    let projectElements = projects.map(p => {
        return <Link key={p.project_id} to={`/app/project/${p.project_id}/`}>
            <h2>{p.name}</h2>
            <p>{p.boats.length} båter</p>
            <p>{p.admins.length} administratorer</p>
        </Link>
    })


    return <div>
        <Link to={'/app/createNew'}>Lag nytt prosjekt</Link>
        {projectElements}
    </div>
}

export default Home

export const CreateNewProject = (props) => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const save = () => {
        setLoading(true)
        post('/project/', {name}).then(r => {
            setLoading(false)
            props.history.push('/app')
        })
    }

    return <Modal loading={loading} title={'Lag nytt prosjekt'} close={() => props.history.push('/app')}>
        <input type={'text'} value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={save}>Lagre</button>
    </Modal>
}