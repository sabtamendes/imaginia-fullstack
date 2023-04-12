import styled from "styled-components";
import { IoIosClose, IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Header() {
  const [showNavBar, setShowNavBar] = useState(false);

  return (
    <>
      <StyledHeader>
        IMAGINIA
        {showNavBar ? (
          <IonIconClose onClick={() => setShowNavBar(!showNavBar)} />
        ) : (
          <IonIconOpen onClick={() => setShowNavBar(!showNavBar)} />
        )}
      </StyledHeader>

      {showNavBar && (
        <StyledNavbar>
          <Link to={"/criar livro"}>
            <li>Criar o livro</li>
          </Link>

          <Link to={"/acessar livro"}>
            <li>Acessar o livro</li>
          </Link>

          <Link to={"/entrar"}>
            <li>Sair da conta</li>
          </Link>
        </StyledNavbar>
      )}
    </>
  );
}
const StyledHeader = styled.div`
  width: 100%;
  height: 6rem;
  position: fixed;
  top: 0;
  background-color: #22366a;
  z-index: 1;
  text-align: center;
  letter-spacing: 3px;
  color: #ffffff;
  font-size: 4rem;
  font-family: "Alkatra", cursive;
  padding-top: 1.1rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  @media (max-width: 700px) {
    font-size: 45px;
  }
`;
const IonIconOpen = styled(IoMdMenu)`
  position: fixed;
  right: 5rem;
  font-size: 4rem;
  cursor: pointer;
  @media (max-width: 900px) {
    right: 5rem;
    font-size: 4rem;
  }
  @media (max-width: 700px) {
    top: 2px;
    right: 1rem;
    font-size: 4rem;
  }
  @media (max-width: 414px) {
    top: 1rem;
    right: 1rem;
    font-size: 2.8rem;
  }
`;
const IonIconClose = styled(IoIosClose)`
  position: fixed;
  top: -0.2rem;
  right: 4rem;
  font-size: 6rem;
  cursor: pointer;
  @media (max-width: 900px) {
    right: 2.5rem;
    font-size: 6.5rem;
  }
  @media (max-width: 700px) {
    right: 0.5rem;
    font-size: 5.2rem;
  }
  @media (max-width: 414px) {
    top: 2px;
    right: 1px;
    font-size: 4rem;
  }
`;
const StyledNavbar = styled.ul`
  position: fixed;
  top: 9%;
  z-index: 1;
  right: 5.3rem;
  background-color: white;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  width: 15rem;
  height: 30rem;
  font-size: 15px;
  padding: 2%;
  li {
    font-size: 14px;
    color: #22376A;
    margin-top: 18px;
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    letter-spacing: 1px;
  }
  a {
    text-decoration: none;
  }
  @media (max-width: 900px) {
    width: 32%;
    height: 50%;
    right: 4.2rem;
  }
  @media (max-width: 700px) {
    right: 2rem;
  }
  @media (max-width: 414px) {
    width: 50%;
    height: 50%;
    right: 1.2rem;
  }
  @media (max-width: 380px) {
    width: 50%;
    height: 50%;
    right: 1rem;
  }
`;
