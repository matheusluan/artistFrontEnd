import styled from "styled-components";

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  widht:100%;
  min-height: 82vh;
`;

export const Container = styled.div`
        max-height: 33.25rem; 
        max-width: 52rem;
        min-width: 33rem;
        width: 100%;
    `

export const NewPost = styled.div`
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    margin: 10px;
    &.show {
        opacity: 1;
    }
 `

export const FormContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: space-between;
    background: #FFFFFF;
    border-radius: 2rem;
    padding: 0.5rem 2.5rem 1rem 2.5rem;
    align-self: left;
`

export const ImportFiles = styled.label`
    color: #41D773;
    font-family: Nunito;
    cursor: pointer;
`

export const NewEvent = styled.a`
    color: #41D773;
    font-family: Nunito;
    margin-left: 70%;
    cursor: pointer;
`

export const Line = styled.hr`
    size: 50;
    width: 95%;
    align: center;
    border: 0;
    border-top: 2px solid #41D773;
`

export const Descr = styled.textarea`
    outline: 0;
    height: 6.25rem;
    border-radius: 0.5rem;
    background: #E5E5E5;
    border-style: none;
    resize: none;
    padding: 1.25rem;
    align-self: center;
    grid-column-start: 1;
    grid-column-end: 3;
    color: #000000;
`

export const Files = styled.div`
    margin: 10px 0;
`

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #000;
`;

export const SelectLabel = styled.label`
  margin-bottom: 0.5rem;
  color: #000;
`;

export const Select = styled.select`
    width: 100%;
    height: 3.125rem;
    padding: 10px;
    border-radius: 0.5rem;
    background: #E5E5E5;
    border-style: none;
    outline: 0;
    color: #000;
    cursor:pointer;
`
export const DivShowForm = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center; 
    align-self: center;
    font: 700 Nunito;
    color: #fff;
    cursor:pointer;
    padding: 0 5px; 
    border-radius: 28px;
`

export const Event = styled.div`
    margin: 10px 0;
`
export const AddEvento = styled.label`
    color: #41D773;
    font-family: Nunito;
    cursor: pointer;
`

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 48rem;
  min-width: 30rem;
  width: 100%;
  margin: 5px 0;
  
`;

export const SearchInput = styled.input`
  padding: 8px;
  width: 100%;
  font-size: 16px;
  border: none;
  border-radius: 8px;

`;

