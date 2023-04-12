import GlobalStyle from "./assets/styles/GlobalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateBookPage from "./pages/CreateBookPage/CreateBookPage";
import GetBookPage from "./pages/GetBookPage/GetBookPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
  return (
    <Router>
      <GlobalStyle />

      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/entrar" element={<SignInPage />} />
        <Route path="/criar livro" element={<CreateBookPage />} />
        <Route path="/acessar livro" element={<GetBookPage />} />
      </Routes>
    </Router>
  );
}

export default App;
