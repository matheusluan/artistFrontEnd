import * as styled from 'styled-components';

import InterMedium from '../assets/fonts/Inter-Medium.ttf';
import InterSemiBold from '../assets/fonts/Inter-SemiBold.ttf';
import NunitoBold from '../assets/fonts/Nunito-Bold.ttf';
import NunitoMedium from '../assets/fonts/Nunito-Medium.ttf';
import RobotoMedium from '../assets/fonts/Roboto-Medium.ttf';
import RobotoRegular from '../assets/fonts/Roboto-Regular.ttf';

// Fazendo a importação das fontes para dentro do projeto,
// e depois fazendo a chamada das fontes e zerando os estilos padrões do browser.
export const GlobalStyles = styled.createGlobalStyle`

    @font-face {
        font-family: 'Nunito';
        font-weight: 500;
        font-display: 'swap';
        font-style: 'normal';
        src: url('${NunitoMedium}') format('truetype');
    }

    @font-face {
        font-family: 'Nunito';
        font-weight: 700;
        font-display: 'swap';
        font-style: 'normal';
        src: url('${NunitoBold}') format('truetype');
    }

    textarea, button, select, a, p, h1, h2, h3, h4, h5, h6, span, label {
        font-family: 'Nunito', sans-serif;
        font-weight: 700;
        font-size: 1rem;
        color: #FFF;
    }

    input {
        font-family: 'Nunito', sans-serif;
        font-weight: 700;
        font-size: 1rem;
    }

    body {
        background: radial-gradient(circle, #9747FF, #684DFF);
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    p {
        margin: 0;
    }

    
    ::-webkit-scrollbar {
        position: sticky;
        z-index: 9;
        width: 0.1rem;
        background-color: transparent;
    }

    ::-webkit-scrollbar-track {
        background: black;
        border-radius:  0.25rem;
    }

    ::-webkit-scrollbar-thumb {
        background: #16425B;
        border-radius: 0.25rem;
        border: none;
    }

`