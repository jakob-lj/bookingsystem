

import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { get } from '../Network/client'
import NetworkIssue from './../ErrorHandling/NetworkIssue'
import {getId} from './../api/api'
const Title = styled.h1`
    color: green;
`

const AdminButtons = () => {
    return <div>
        <button>Legg til administrator</button>
        <button>Legg til ny båt</button>
        <button>Legg til gruppe</button>
    </div>
}

const ProjectDetail = ({match}) => {

    const [project, setProject] = useState(undefined)
    const [boats, setBoats] = useState(undefined)
    const [isAdmin, setAdmin] = useState(false)
    const [error, setError] = useState(null)

    let project_id = match.params.project_id

    useEffect(() => {

        get(`/project/${project_id}/`).then(r => r.json()).then(r => {
            let admins = r.admins
            let isAdmin = false
            for (var i = 0; i < admins.length; i++) {
                let adminId = admins[i].user.user_id
                if (adminId === getId()) {
                    console.log('is true')
                    isAdmin = true
                    break
                }
            }
            let bs = r.boats
            setBoats(bs)
            setAdmin(isAdmin)
            setProject(r)
        }).catch(err => {
            setError(err)
        })

    }, [project_id])

    if ((project === undefined || boats === undefined) && !error) {
        return <div>
            loading...
        </div>
    }

    if (error) {
        return <NetworkIssue error={error} />
    }

    let boatObjects = boats.map(boat => {
        return <div key={'boat'+boat.boat_id}>
            {boat.name}
        </div>
    })
    
    return <div>
        {isAdmin && <AdminButtons />}
        <Title>{project.name}</Title>
        {boatObjects}
    </div>
    
}

export default ProjectDetail