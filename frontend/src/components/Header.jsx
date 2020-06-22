
import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const HeaderDiv = styled.div`
    
    background-color: #555;
    text-decoration: none;
`

const LogOutText = styled(Link)`
    color: white;
    text-decoration: none;
    position: absolute;
    right: 1em;
    top: 1em;
`

const Title = styled.h1`
    color: white;
    margin: 0;
    padding: 1em;
`

const Header = (props) => {
    return <HeaderDiv>
        <Link to={'/app'}><Title>BB</Title></Link>
        <LogOutText to={'/logout'}>Log out</LogOutText>
    </HeaderDiv>
}

export default Header