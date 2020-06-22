

import React, {useEffect, useState} from 'react'
import {get} from './../Network/client'
import {Link} from 'react-router-dom'
import NetworkIssue from './../ErrorHandling/NetworkIssue'

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
        return <Link key={p.project_id} to={`/project/${p.project_id}/`}>
            <h2>{p.name}</h2>
        </Link>
    })


    return <div>
        {projectElements}
    </div>
}

export default Home