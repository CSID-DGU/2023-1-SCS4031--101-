import styled, { css } from "styled-components";
import board from "../assets/Board.png";
import convertBtn from "../assets/Convert.png";
import homeBtn from "../assets/Home.png";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <Wrap>
      <div className="textBox">
        <div className="text1">안녕하세요일영일입니다</div>
        <div className="text2">색각이상자를위한</div>
        <div className="text3">비디오변환서비스</div>
        <div className="btnBox">
          <Link to="/preview">
            <img className="convertBtn" src={convertBtn} />
          </Link>
          <img className="homeBtn" src={homeBtn} />
        </div>
      </div>
      <div className="imgBox">
        <img className="boardImg" src={board} />
      </div>
    </Wrap>
  );
}

const typingAnimation = css`
  border-right: 5px solid;
  white-space: nowrap;
  overflow: hidden;

  @keyframes cursor {
    50% {
      border-color: transparent;
    }
  }

  @keyframes typing {
    from {
      width: 0;
    }
  }
`;

const cursorEndAnimation = css`
  @keyframes cursor-end {
    100% {
      border-color: transparent;
    }
  }
`;

const Wrap = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  min-width: 100vw;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #f04a4a, #a326f0);
  font-family: "Jua", sans-serif;

  .textBox {
    position: relative;
    left: 13vw;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: #fff;

    .text1 {
      font-size: 3.5vw;
      margin-bottom: 20px;
      width: 70%;
      ${typingAnimation}
      animation: typing 2s steps(11), cursor 0.4s step-end infinite alternate, cursor-end 0.1s 2s forwards;
      ${cursorEndAnimation}
    }

    .text2 {
      visibility: hidden;
      font-size: 4vw;
      width: 57.8%;
      ${typingAnimation}
      animation: visibility 0s linear 2s forwards, typing 2s steps(8) 2s,
        cursor 0.4s step-end 2s infinite alternate, cursor-end 0.1s 4s forwards;

      @keyframes visibility {
        100% {
          visibility: visible;
        }
      }
      ${cursorEndAnimation}
    }
    .text3 {
      visibility: hidden;
      font-size: 4vw;
      margin-bottom: 5px;
      width: 57%;
      ${typingAnimation}
      animation: visibility 0s linear 4s forwards, typing 2s steps(8) 4s,
        cursor 0.4s step-end 4s infinite alternate;

      @keyframes visibility {
        100% {
          visibility: visible;
        }
      }
    }

    .btnBox {
      width: 40%;
      display: flex;

      a {
        display: inline-block;
        width: 50%;
      }

      .convertBtn {
        width: 100%;
        height: auto;
        margin-right: 10px;
        cursor: pointer;
      }

      .homeBtn {
        width: 30%;
        margin-left: 10px;
        height: auto;
        cursor: pointer;
      }
    }
  }

  .imgBox {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1.2;

    .boardImg {
      width: 75%;
    }
  }
`;
