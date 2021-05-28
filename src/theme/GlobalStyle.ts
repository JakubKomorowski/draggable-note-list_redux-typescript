import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
   
}

body{
    font-family: 'Poppins', sans-serif;
    /* background-color: #F0F3F5; */
    overflow-x: hidden;
}

button {
    cursor: pointer;
    
}
`;

export default GlobalStyle;
