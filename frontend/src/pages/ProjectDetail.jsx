

import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { get, post } from '../Network/client'
import NetworkIssue from './../ErrorHandling/NetworkIssue'
import {getId} from './../api/api'
import Modal from '../components/Modal'
import {Link} from 'react-router-dom'
const Title = styled.h1`
    color: green;
`

const AdminButtons = ({project_id}) => {
    return <div>
        <Link>Legg til administrator</Link>
        <Link to={`/app/project/${project_id}/createNewBoat`}>Legg til ny båt</Link>
        <Link>Legg til gruppe</Link>
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
        {isAdmin && <AdminButtons project_id={project_id} />}
        <Title>{project.name}</Title>
        {boatObjects}
    </div>
    
}

export default ProjectDetail

export const CreateNewBoat = (props) => {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')

    let project_id = props.match.params.project_id

    const save = () => {
        post(`/project/${project_id}/boats/`, {name}).then(r => {
            console.log(r)
        })
    }

    return <Modal loading={loading} title={'Legg til ny båt'} close={() => props.history.push(`/app/project/${project_id}`)} >
        <input type={'text'} value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={save}>Lagre</button>
   </Modal>
}