import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Form } from "../../pages/SignInPage/SignInPage";
import { postSignIn } from "../../services/Services";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const body = { email, password };
    try {
      await postSignIn(body);
      setDisabled(true);
      navigate("/criar livro");
    } catch (error) {
      console.log(error, "EROOO")
      if (error) {
        return setError("senha e/ou email incorretos!");
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>IMAGINIA</h1>
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email"
        disabled={disabled}
        required
      />
      <input
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Senha"
        disabled={disabled}
        required
      />
      {error && <TextError>{error}</TextError>}
      <button>Entrar</button>
      <Link to={"/"}>Primeira vez? Cadastre-se!</Link>
    </Form>
  );
}

const TextError = styled.p`
  margin-left: 3.4rem;
  margin-bottom: 8px;
  margin-top: -8px;
  color: #ffd639;
`;
