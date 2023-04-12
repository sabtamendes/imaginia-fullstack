import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
	box-sizing: border-box;
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
	font-family: 'Lexend Deca', sans-serif;
	background-color: rgb(30, 50, 102);
  background-color: linear-gradient(
    180deg,
    rgba(30, 50, 102, 1) 0%,
    rgba(156, 183, 217, 1) 99%,
    rgba(255, 255, 255, 1) 100%
  );
	overflow-x: hidden;
	::-webkit-scrollbar {
    width: 8px; /* largura da barra de rolagem */
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* cor de fundo da track */
  }

  ::-webkit-scrollbar-thumb {
    background: #407CCC; /* cor da thumb */
    border-radius: 10px; /* arredondamento da thumb */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: blue; /* cor da thumb ao passar o mouse */
  }
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

`


export default GlobalStyle;