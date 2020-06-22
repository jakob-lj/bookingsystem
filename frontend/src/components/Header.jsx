
import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const HeaderDiv = styled.div`
    
    background-color: #555;
`

const Title = styled.h1`
    color: white;
    margin: 0;
    padding: 1em;
`

const Header = (props) => {
    return <HeaderDiv>
        <Link to={'/'}><Title>BB</Title></Link>
    </HeaderDiv>
}

export default Header