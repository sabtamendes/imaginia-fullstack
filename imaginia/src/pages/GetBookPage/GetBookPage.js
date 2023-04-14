import Slider from "react-slick";
import styled from "styled-components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getBook } from "../../services/Services";
import { useState } from "react";
import Header from "../../components/Header/Header";

const SlideContainer = styled.div`
  @media (max-width: 900px) {
    width: 60%;
    max-width: 90%;
  }
  @media (max-width: 616px) {
    width: 80%;
    max-width: 90%;
  }
  @media (max-width: 416px) {
    width: 85%;
    max-width: 100%;
  }
  width: 40%;
  height: 60vh;
  background-color: white;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -5%;
    height: 100%;
    width: 5%;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.2);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: -5%;
    height: 100%;
    width: 5%;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: -2px 0 4px rgba(0, 0, 0, 0.2);
  }

  & > * {
    max-width: 100%;
  }
`;

const Slide = ({ children }) => {
  return <SlideContainer>{children}</SlideContainer>;
};

const appendDots = (dots) => (
  <ul>
    {dots.map((dot, index) => (
      <li key={index}>{dot}</li>
    ))}
  </ul>
);

const customPaging = (index) => (
  <span
    style={{
      backgroundColor: "white",
      borderRadius: "50%",
      width: "10px",
      height: "10px",
      display: "inline-block",
      marginTop: "1px",
      transition: "background-color 0.2s ease-in-out",
      ":hover": {
        backgroundColor: "#7DD4EF",
        cursor: "pointer",
      },
    }}
  />
);

const settings = {
  dots: true,
  appendDots: appendDots,
  customPaging: customPaging,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  centerMode: true,
  centerPadding: "0px",
};

const GetBookPage = () => {
  const [book, setBook] = useState(null);
  const [code, setCode] = useState("");

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleRequestBook = async () => {
    try {
      const response = await getBook(code);
      setBook(response.data);
      setCode("");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <>
      <Header />
      <Box>
        <Input
          type="text"
          placeholder="Código Mágico"
          value={code}
          onChange={handleCodeChange}
        />
        <Button onClick={handleRequestBook}>Buscar o Livro</Button>
      </Box>
      {book && (
        <SlideBox>
          <p>Título: {book.title}</p>
          <p>Autor: {book.author}</p>
          <p>Professor: {book.professor}</p>
        </SlideBox>
      )}

      <Slider {...settings}>
        {book &&
          book.pages.map((slide, index) => {
            return (
              <Slide key={index}>
                {slide.pageType === "TEXT" && (
                  <p>{slide.content}</p>
                )}
              </Slide>
            );
          })}
      </Slider>
    </>
  );
};

export default GetBookPage;

const Box = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 8%;
  margin-bottom: 5%;
  margin-left: 37.5%;
  @media (max-width: 1300px) {
    margin-top: 8rem;
    margin-bottom: 5%;
    margin-left: 37.5%;
  }
  @media (max-width: 1000px) {
    margin-top: 8rem;
    margin-bottom: 5%;
    margin-left: 21.5%;
  }
  @media (max-width: 560px) {
    margin-top: 8rem;
    margin-bottom: 5%;
    margin-left: 15%;
  }
`;
const Input = styled.input`
  width: 40%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 2%;
  border-radius: 4px;
  border: none;
  @media (max-width: 1000px) {
    width: 70%;
    padding: 10px;
  }
  @media (max-width: 560px) {
    width: 80%;
    padding: 10px;
  }
`;
const Button = styled.button`
  width: 40%;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0069d9;
  }
  @media (max-width: 1000px) {
    width: 70%;
    padding: 10px;
  }
  @media (max-width: 560px) {
    width: 80%;
    padding: 10px;
  }
`;
const SlideBox = styled.div`
  height: 15%;
  display: flex;
  align-items: center;
  margin: 10px 15px 15px 32%;
  text-align: center;
  h3 {
    font-family: "Poppins", sans-serif;
    font-size: 18px;
    color: #ffffff;
    margin: 0.2em;
  }
  p {
    font-family: "Poppins", sans-serif;
    font-size: 18px;
    color: #ffffff;
    margin: 0.8em;
  }
  @media (max-width: 1800px) {
    width: 100%;
    margin: 10px 15px 15px 1%;
    flex-direction: column;
  }
  @media (max-width: 1300px) {
    width: 100%;
    margin: 10px 15px 15px -1%;
    flex-direction: column;
  }
  @media (max-width: 900px) {
    width: 100%;
    margin: 10px 15px 15px 1%;
    flex-direction: column;
    p {
      margin: 8px;
    }
  }
  @media (max-width: 650px) {
    width: 45%;
    margin: 10px 15px 15px 25%;
  }
  @media (max-width: 480px) {
    width: 82%;
    margin: 10px 15px 15px 7.5%;
  }
  @media (max-width: 316px) {
    width: 108%;
  }
`;
