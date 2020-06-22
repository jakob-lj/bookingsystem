

import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { get } from '../Network/client'
import NetworkIssue from './../ErrorHandling/NetworkIssue'
const Title = styled.h1`
    color: green;
`

const ProjectDetail = ({match}) => {

    const [project, setProject] = useState(undefined)
    const [error, setError] = useState(null)

    let project_id = match.params.project_id

    useEffect(() => {

        get(`/project/${project_id}/`).then(r => r.json()).then(r => {
            setProject(r)
        }).catch(err => {
            setError(err)
        })

    }, [project_id])

    if (project === undefined && !error) {
        return <div>
            loading...
        </div>
    }
    
    if (error) {
        return <NetworkIssue error={error} />
    }

    return <div>
        <Title>{project.name}</Title>
    </div>
    
}

export default ProjectDetail