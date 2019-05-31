import React from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
    padding: 150px 0;
    background: linear-gradient(45deg, rgba(170,0,255,1) 0%, rgba(25,117,210,1) 50%, rgba(32,148,243,1) 100%);
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

const H1 = styled.h1`
    color: white;
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    padding: 10px;
    text-align: center;
    animation: ${fadeIn} 1s ease-in-out;
`;

const H2 = styled(H1)`
    font-size: 1rem;
`;

export default function App() {
    return (
        <Wrapper>
            <H1>Hello World!</H1>
            <H2 as="h2">Let&lsquo;s build something great</H2>
        </Wrapper>
    );
}
