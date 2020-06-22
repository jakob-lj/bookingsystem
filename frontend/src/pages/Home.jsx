

import React, {useEffect, useState} from 'react'
import {get} from './../Network/client'
import {Link} from 'react-router-dom'

const Home = (props) => {
    const [projects, setProjects] = useState(undefined)

    useEffect(() => {
        get('/project/').then(r => r.json()).then(r => {
            setProjects(r)
        })
    }, [])


    if (projects === undefined) {
        return <div>Loading...</div>
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