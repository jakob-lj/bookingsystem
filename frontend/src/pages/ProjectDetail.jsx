

import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { get, post } from '../Network/client'
import NetworkIssue from './../ErrorHandling/NetworkIssue'
import {getId} from './../api/api'
import Modal from '../components/Modal'
import {Link} from 'react-router-dom'
import lang from './../lang/types'

const Title = styled.h1`
    color: green;
`

const AdminButtons = ({project_id, type}) => {
    return <div>
        <Link to={'/'}>Legg til administrator</Link>
        <Link to={`/app/project/${project_id}/createNewBoat`}>Legg til ny {lang[type]['typeName']['one']}</Link>
        <Link to={'/'}>Legg til gruppe</Link>
    </div>
}

const ProjectDetail = ({match}) => {

    const [project, setProject] = useState(undefined)
    const [objects, setObjects] = useState(undefined)
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
                    isAdmin = true
                    break
                }
            }
            let bs = r.objects
            setObjects(bs)
            setAdmin(isAdmin)
            setProject(r)
        }).catch(err => {
            setError(err)
        })

    }, [project_id])

    if ((project === undefined || objects === undefined) && !error) {
        return <div>
            loading...
        </div>
    }

    if (error) {
        return <NetworkIssue error={error} />
    }

    let boatObjects = objects.map(object => {
        return <div key={'object'+object.object_id}>
            {object.name}
        </div>
    })
    
    return <div>
        {isAdmin && <AdminButtons project_id={project_id} type={project.project_type} />}
        <Title>{project.name}</Title>
        {boatObjects}
    </div>
    
}

export default ProjectDetail

export const CreateNewBoat = (props) => {
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [project_type, setProjectType] = useState('other')

    let project_id = props.match.params.project_id
    let history = props.history

    useEffect(() => {
        get(`/project/${project_id}/type/`).then(r => r.json()).then(r => {
            setProjectType(r.type)
            setLoading(false)
        })
    }, [project_id])

    const save = () => {
        setLoading(true)
        post(`/project/${project_id}/objects/`, {name}).then(r => {
            //history.push(`/app/project/${project_id}/`)
            window.location.href= `/app/project/${project_id}`
        }).catch(err => {
            console.log(err)
            setError(err)
        })
    }

    return <Modal error={error} loading={loading} title={`Legg til ny ${lang[project_type]['typeName']['one']}`} close={() => props.history.push(`/app/project/${project_id}`)} >
        <input type={'text'} value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={save}>Lagre</button>
   </Modal>
}