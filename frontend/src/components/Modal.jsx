import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(85, 85, 85, 0.45);
    padding: 1em;
`

const Content = styled.div`
    background: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    width: 800px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.42);
    box-shadow: 2px 2px 10px #00000044;

`

const Body = styled.div`
    padding: 1em;
`

const Header = styled.div`
padding: 1em;
border-bottom: 1px solid gray;
`

const Title = styled.h2`
color: gray;
`

const Modal = (props) => {
    
    if (props.loading) {
        return <Wrapper>
            <Content>
                Loading...
            </Content>
        </Wrapper>
    }

    return <Wrapper>
        <Content>
            <Header>
                <Title>
                    {props.title}
                </Title>
            </Header>
            <Body>
                {props.children}
                <button onClick={props.close} >Lukk</button>
            </Body>
        </Content>
    </Wrapper>
}

export default Modal