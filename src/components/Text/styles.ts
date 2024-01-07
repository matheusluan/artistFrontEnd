import styled from "styled-components";

export const PContainer = styled.p<{ color?: string; fontSize: string; textAlign?: string; }>`
    font-size: ${props => props.fontSize || "1rem"};
    color: ${props => props.color || "#000000"};
    text-align: ${props => props.textAlign || "left"};
`