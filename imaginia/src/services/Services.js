import axios from "axios";

async function postSignUp(body) {
  return await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/sign-up`,
    body
  );
}

async function postSignIn(body) {
  return await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/sign-in`,
    body
  );
}

async function postBook(body) {
  return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/book`, body);
}

async function getBook(magicCode) {
  return await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/book?magicCode=${magicCode}`
  );
}
export { postSignUp, postSignIn, postBook, getBook };
