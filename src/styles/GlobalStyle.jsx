import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background: linear-gradient(180deg, #ffd1d1, #ff6b6b);
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    transition: background 300ms ease;
  }

  #root {
    width: 100%;
    max-width: 980px;
    padding: 1.2rem 0;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
