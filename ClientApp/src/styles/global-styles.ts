import { createGlobalStyle } from "styled-components/macro";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Futura Medium";
    src: url("/fonts/Futura-Medium.otf"); /* IE */
    src: local("Futura"), url( "/fonts/Futura-Medium.otf" ) format("truetype"); /* non-IE */  
  }
  html {
    height: 100%;
    
    /* Removing overscroll by design */
    overflow: hidden;

    font-size: 16px;
  }

  body {
    width: 100%;
    height: 100%;
    font-family: "Futura Medium";
    overflow-x: hidden;
    overflow-y: auto;
    -ms-overflow-x: hidden;
    -ms-overflow-y: auto;
    background: ${({ theme }) => theme.color.backgroundLight};
    background-attachment: fixed;
    color: ${({ theme }) => theme.color.font};
    box-sizing: border-box;
    padding-top: calc(${({ theme }) => theme.headerHeight} + 15px);
  }

  * {
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: subpixel-antialiased;
    box-sizing: border-box;
  }

  #root {
    height: 100%;
  }

  ::-webkit-input-placeholder { /* Edge */
    text-transform: lowercase;
  }
  
  :-ms-input-placeholder { /* Internet Explorer */
    text-transform: lowercase;
  }
  
  ::placeholder {
    text-transform: lowercase;
  }
  
  .react-datepicker-wrapper {
    width: 100%;
  }

  /* Set header to stick to the top of the container. */
thead tr th {
  position: sticky;
  top: 0;
  background: #E6E6E6;
}

tbody tr:hover {
  background: #e6f7ff;
}
`;
