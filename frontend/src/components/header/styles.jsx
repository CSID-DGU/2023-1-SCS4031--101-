import styled from "styled-components";

export const Wrap = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;

  .navigation {
    border-radius: 20px;
    position: fixed;
    inset: 40px 0 40px 20px;
    background: rgba(255, 255, 255, 0.8);
    width: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
  }

  .navigation.active {
    width: 250px;
  }

  .menuToggle {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 23px;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }

  .menuToggle::before {
    content: "";
    position: absolute;
    width: 30px;
    height: 2px;
    background-color: #333;
    transform: translateY(-8px);
    transition: 0.5s;
  }

  .navigation.active .menuToggle::before {
    transform: translateY(0) rotate(45deg);
  }

  .menuToggle::after {
    content: "";
    position: absolute;
    width: 30px;
    height: 2px;
    background-color: #333;
    transform: translateY(8px);
    box-shadow: 0 -8px 0 #333;
    transition: 0.5s;
  }

  .navigation.active .menuToggle::after {
    transform: translateY(0) rotate(-45deg);
    box-shadow: 0 0 0 #333;
  }

  .navigation ul {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .navigation ul li {
    box-sizing: border-box;
    list-style: none;
    position: relative;
    width: 100%;
    height: 76px;
    border-radius: 12px;
    border: 8px solid transparent;
    transition: 0.5;
  }

  .navigation ul li.active {
    transform: translateX(30px);
    background: #2f323f;
  }

  .navigation ul li::before {
    content: "";
    position: absolute;
    top: -28px;
    right: -10px;
    width: 20px;
    height: 20px;
    background: transparent;
    border-bottom-right-radius: 20px;
    box-shadow: 6px 5px 0 5px #2f323f;
    transform: scale(0);
    transform-origin: bottom right;
    transition: 0.5s;
  }

  .navigation ul li.active::before {
    right: 22px;
    transform: scale(1);
  }

  .navigation ul li::after {
    content: "";
    position: absolute;
    bottom: -28px;
    right: -10px;
    width: 20px;
    height: 20px;
    background: transparent;
    border-top-right-radius: 20px;
    box-shadow: 6px -3px 0 3px #2f323f;
    transform: scale(0);
    transform-origin: bottom right;
    transition: 0.5s;
  }

  .navigation ul li.active::after {
    right: 22px;
    transform: scale(1);
  }

  .navigation ul li a {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    text-align: center;
    text-decoration: none;
    z-index: 1000;
  }

  .navigation ul li a .icon {
    position: relative;
    display: block;
    min-width: 50px;
    height: 50px;
    border-radius: 10px;
    background: #fff;
    font-size: 1.75em;
    line-height: 50px;
    border: 6px solid transparent;
  }

  .navigation ul li.active a .icon {
    background: ${(props) => props.activeColor};
  }

  .navigation ul li a .icon::before {
    content: "";
    position: absolute;
    top: 12px;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${(props) => props.activeColor};
    filter: blur(8px);
    opacity: 0;
    transition: 0.5s;
  }

  .navigation ul li.active a .icon::before {
    opacity: 0.5;
  }

  .navigation ul li a .icon::after {
    content: "";
    position: absolute;
    top: 10px;
    left: -60px;
    width: 15px;
    height: 15px;
    background: ${(props) => props.activeColor};
    border: 8px solid #2f323f;
    border-radius: 50%;
  }

  .navigation ul li a .text {
    position: relative;
    padding: 0 15px;
    color: #333;
    display: flex;
    align-items: center;
    height: 60px;
    opacity: 0;
    visibility: hidden;
    transition: 0.5s;
  }

  .navigation.active ul li a .text {
    visibility: visible;
    opacity: 1;
  }

  .navigation ul li.active a .text {
    color: #fff;
  }
`;
