

import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { get } from '../Network/client'

const Title = styled.h1`
    color: green;
`

const ProjectDetail = ({match}) => {

    const [project, setProject] = useState(undefined)

    let project_id = match.params.project_id

    useEffect(() => {

        get(`/project/${project_id}/`).then(r => r.json()).then(r => {
            setProject(r)
        })

    }, [project_id])

    if (project === undefined) {
        return <div>
            loading...
        </div>
    }

    return <div>
        <Title>{project.name}</Title>
    </div>
}

export default ProjectDetail