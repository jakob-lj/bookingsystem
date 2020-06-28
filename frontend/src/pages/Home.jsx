

import React, {useEffect, useState} from 'react'
import {get, post} from './../Network/client'
import {Link} from 'react-router-dom'
import NetworkIssue from './../ErrorHandling/NetworkIssue'
import Modal from './../components/Modal'
import settings from './../config'
import {getTypeFromProject} from './../lang/types'

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
            <p>{p.objects.length} {getTypeFromProject(p)}</p>
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
    const [error, setErr] = useState(undefined)
    const [projectType, setProjectType] = useState('')

    const save = () => {
        setLoading(true)
        post('/project/', {name, project_type: projectType}).then(r => {
            setLoading(false)
            props.history.push('/app')
        }).catch(err => {
            setErr(err)
            console.log(err)
        })
    }

    return <Modal error={error} loading={loading} title={'Lag nytt prosjekt'} close={() => props.history.push('/app')}>
        <input placeholder={'Navn'} type={'text'} value={name} onChange={(e) => setName(e.target.value)} />
        <select value={projectType} onChange={(e) => setProjectType(e.target.value)}>
            <option value={''}></option>
            <option value={settings.projectTypes.BOATS}>Båter</option>
            <option value={settings.projectTypes.CARS}>Biler</option>
            <option value={settings.projectTypes.OTHERS}>Andre</option>
        </select>
        <button onClick={save}>Lagre</button>
    </Modal>
}