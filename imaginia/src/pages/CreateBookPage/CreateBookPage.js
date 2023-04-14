import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import { postBook } from "../../services/Services";

export default function CreateBookPage() {
  const [code, setCode] = useState("");
  const [formValues, setFormValues] = useState({
    title: "",
    author: "",
    professor: "",
    pages: [
      { pageNumber: 1, pageType: "TEXT", content: "" },
      { pageNumber: 2, pageType: "TEXT", content: "" },
      { pageNumber: 3, pageType: "TEXT", content: "" },
      { pageNumber: 4, pageType: "TEXT", content: "" },
      { pageNumber: 5, pageType: "TEXT", content: "" },
      { pageNumber: 6, pageType: "TEXT", content: "" },
    ],
  });

  const handleInputChange = (e, pageIndex) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => {
      const pages = [...prevValues.pages];
      pages[pageIndex][name] = value;

      return {
        ...prevValues,
        pages,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { ...formValues };
    try {
      const response = await postBook(body);
      setCode(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <Container code={code}>
        <Header />
        {code ? (
          <MagicBox>
            <Link to={"/acessar livro"}>
              <h2>Código mágico: {code.magicCode}</h2>
            </Link>
            <p>Com esse código você pode acessar o livro!</p>
          </MagicBox>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Styled>
              <label htmlFor="title">Título:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formValues.title}
                onChange={(e) =>
                  setFormValues({ ...formValues, title: e.target.value })
                }
              />

              <label htmlFor="author">Autor:</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formValues.author}
                onChange={(e) =>
                  setFormValues({ ...formValues, author: e.target.value })
                }
              />

              <label htmlFor="professor">Professor:</label>
              <input
                type="text"
                id="professor"
                name="professor"
                value={formValues.professor}
                onChange={(e) =>
                  setFormValues({ ...formValues, professor: e.target.value })
                }
              />
            </Styled>
            {formValues.pages.map((page, index) => (
              <Box key={page.pageNumber}>
                <h3>Página {page.pageNumber}</h3>
                {page.pageType === "TEXT" && (
                  <textarea
                    name="content"
                    value={page.content}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                )}
              </Box>
            ))}

            <button type="submit">Salvar o livro</button>
          </Form>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  height: ${(props) => (props.code.magicCode ? "50rem" : "210rem")};
  background: rgb(30, 50, 102);
  background: linear-gradient(
    180deg,
    rgba(30, 50, 102, 1) 0%,
    rgba(156, 183, 217, 1) 99%,
    rgba(255, 255, 255, 1) 100%
  );
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const MagicBox = styled.div`
  position: fixed;
  z-index: 2;
  bottom: 50%;
  width: 28rem;
  height: 4.2rem;
  background-color: yellow;
  font-family: "Poppins", sans-serif;
  font-size: 2rem;
  border-radius: 5px;
  -webkit-box-shadow: 2px 5px 15px 5px #000000;
  box-shadow: 2px 2px 10px 5px orange;
  text-align: center;
  padding-top: 1.5%;
  cursor: pointer;
  p {
    margin-top: 10%;
    font-size: 20px;
    word-break: break-all;
  }
  a {
    text-decoration: none;
  }
`;
const Form = styled.form`
  margin-top: 15rem;
  @media (max-width: 900px) {
    margin-top: 8rem;
  }
  font-family: "Poppins", sans-serif;
  label {
    margin: auto 0.5rem auto 0.1rem;
    font-size: 1rem;
    font-weight: bold;
    font-family: "Poppins", sans-serif;
    color: #ffffff;
  }
  input {
    height: 2rem;
    border-radius: 5px;
    border: none;
  }
  button {
    margin: 0 auto;
    width: 10rem;
    height: 2rem;
    color: #ffffff;
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #22366a;
  }
`;
const Styled = styled.div`
  input {
    margin-right: 15px;
  }
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    label {
      margin-top: 12px;
      margin-left: 0;
    }
  }
`;
const Box = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  h3 {
    margin: 1.5rem auto 0.6rem auto;
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    color: #ffffff;
  }
  textarea {
    width: 100%;
    height: 20rem;
    max-width: 50rem;
    border-radius: 8px;
    border: none;
    font-size: 1.5rem;
    font-family: "Poppins", sans-serif;
    padding: 1rem;
    color: #22366a;
    background-color: #fff;
    border: none;
    border-radius: 10px;
    -webkit-box-shadow: 1px 5px 15px 5px #273c6e;
    box-shadow: 1px 5px 15px 5px #273c6e;
    resize: none;
    display: block;
    z-index: 1;
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #407ccc;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: blue;
    }
  }
`;
