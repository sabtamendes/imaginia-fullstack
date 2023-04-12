import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Form } from "../../pages/SignInPage/SignInPage";
import { postSignUp } from "../../services/Services";

export default function SignUp() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const [forms, setForms] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleForm(e) {
    const { name, value } = e.target;
    setForms({ ...forms, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (forms.confirmPassword !== forms.password) {
      return setError("senha não coincide");
    } else if (forms.password.length < 6) {
      return setError("mínimo 6 caracteres");
    }
    setError("");
    const email = forms.email;
    const password = forms.password;
    const body = { email, password };
    try {
      await postSignUp(body);
      setDisabled(true);
      setTimeout(() => navigate("/entrar"), 300);
    } catch (error) {
      if (error.response.status === 409) {
        return setError("email já existente");
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>IMAGINIA</h1>
      <input
        name="name"
        value={forms.name}
        onChange={handleForm}
        type="text"
        placeholder="Nome"
        disabled={disabled}
        required
      />
      <input
        name="email"
        value={forms.email}
        onChange={handleForm}
        type="text"
        placeholder="Email"
        disabled={disabled}
        required
      />
      {error === "email já existente" && <TextError>{error}</TextError>}
      <input
        name="password"
        value={forms.password}
        onChange={handleForm}
        type="password"
        placeholder="Senha"
        disabled={disabled}
        required
      />
      {error === "mínimo 6 caracteres" && <TextError>{error}</TextError>}
      <input
        name="confirmPassword"
        value={forms.confirmPassword}
        onChange={handleForm}
        type="password"
        placeholder="Confirme a Senha"
        disabled={disabled}
        required
      />
      {error === "senha não coincide" && <TextError>{error}</TextError>}
      <button>Entrar</button>
      <Link to={"/entrar"}>Já tem uma conta? Entre agora!</Link>
    </Form>
  );
}

const TextError = styled.p`
  margin-left: 7.1rem;
  margin-bottom: 8px;
  margin-top: -8px;
  color: #ffd639;
`;
