import styled from "styled-components";
import SignUp from "../../components/SignUp/SignUp";

export default function SignUpPage() {
  return (
    <Container>
      <Box>
      <SignUp />
      </Box>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1000%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='%231e3266'%3e%3c/rect%3e%3cpath d='M1536 560L0 560 L0 308.57Q49.45 286.02%2c 72 335.48Q125.86 269.34%2c 192 323.19Q265.09 276.28%2c 312 349.37Q380.85 298.22%2c 432 367.06Q442.68 305.74%2c 504 316.41Q549.4 241.82%2c 624 287.22Q714.17 257.39%2c 744 347.57Q811.16 294.74%2c 864 361.9Q903.33 281.23%2c 984 320.56Q1028.8 293.36%2c 1056 338.16Q1129.06 291.22%2c 1176 364.28Q1213.55 281.82%2c 1296 319.37Q1345.59 248.96%2c 1416 298.54Q1466.9 229.45%2c 1536 280.35z' fill='%23182f5d'%3e%3c/path%3e%3cpath d='M1512 560L0 560 L0 404.97Q18.85 351.82%2c 72 370.67Q141.8 320.47%2c 192 390.26Q207.93 334.19%2c 264 350.12Q330.79 296.91%2c 384 363.7Q452.55 312.25%2c 504 380.8Q586.37 343.17%2c 624 425.54Q627.88 357.42%2c 696 361.29Q750.75 296.05%2c 816 350.8Q864.2 327%2c 888 375.2Q981.84 349.04%2c 1008 442.88Q1044.68 359.56%2c 1128 396.25Q1174.1 322.35%2c 1248 368.45Q1304.65 353.11%2c 1320 409.76Q1341.72 359.48%2c 1392 381.2Q1483 352.2%2c 1512 443.2z' fill='%2325467d'%3e%3c/path%3e%3cpath d='M1488 560L0 560 L0 455.81Q50.43 386.24%2c 120 436.67Q219.64 416.31%2c 240 515.94Q254.67 410.62%2c 360 425.29Q403.45 396.74%2c 432 440.19Q485.91 422.1%2c 504 476.01Q554.63 406.64%2c 624 457.28Q684.04 445.31%2c 696 505.35Q699.55 436.9%2c 768 440.46Q796.55 397%2c 840 425.55Q918.89 384.44%2c 960 463.33Q990.53 421.87%2c 1032 452.4Q1076.63 377.03%2c 1152 421.67Q1208.76 406.43%2c 1224 463.18Q1299.64 418.82%2c 1344 494.46Q1354.73 433.19%2c 1416 443.93Q1457.76 413.69%2c 1488 455.46z' fill='%23356cb1'%3e%3c/path%3e%3cpath d='M1536 560L0 560 L0 554.6Q37.14 471.75%2c 120 508.89Q161.6 478.49%2c 192 520.09Q261.41 517.5%2c 264 586.92Q280.34 483.26%2c 384 499.6Q451.81 447.41%2c 504 515.21Q587.62 478.83%2c 624 562.44Q653.12 471.56%2c 744 500.67Q792.59 477.25%2c 816 525.84Q891.93 481.77%2c 936 557.69Q968.41 470.1%2c 1056 502.51Q1135.3 461.81%2c 1176 541.11Q1221.75 466.87%2c 1296 512.62Q1385.55 482.17%2c 1416 571.72Q1455.07 490.79%2c 1536 529.85z' fill='white'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1000'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  @media (max-width: 500px) {
    overflow: hidden;
  }
`;
const Box = styled.div`
  width: 25rem;
  height: 28rem;
  background-color: #fffafa2e;
  box-shadow: #ffffff;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
`;
export const Form = styled.form`
  * {
    box-sizing: border-box;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  h1 {
    position: fixed;
    top: 35px;
    z-index: 1;
    color: #ffffff;
    font-family: "Alkatra", cursive;
    font-size: 28px;
    letter-spacing: 3px;
    box-shadow: #000000;
  }
  input {
    width: 16rem;
    height: 2.5rem;
    margin-bottom: 10px;
    border: none;
    border-radius: 4px;
    padding-left: 8px;
    &::placeholder {
      font-family: "Poppins", sans-serif;
      font-size: 14px;
      color: grey;
    }
  }
  button {
    width: 16rem;
    height: 2.5rem;
    font-family: "Poppins", sans-serif;
    font-size: 16px;
    margin-top: 8px;
    border: none;
    border-radius: 4px;
    background-color: #356cb1;
    font-weight: bold;
    color: #ffffff;
    cursor: pointer;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
    font-size: 15px;
    font-weight: bold;
    color: #ffffff;
    font-family: "Poppins", sans-serif;
    text-decoration: none;
  }
`;
