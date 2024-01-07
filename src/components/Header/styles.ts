import styled from 'styled-components';

export const Container = styled.header`
    display: flex;
    justify-content: space-between;
    margin: 0.80rem 16rem;
    align-items: center;
`

export const Logo = styled.div`
    img{
        width: 10rem;
    }
`

export const Links = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: 100%;
    justify-content: space-between;
`