import React, { useState, useRef } from "react";
import styled from "styled-components";
import { IoMdMap, IoIosCall, IoIosMail } from "react-icons/io";
import Bg from "../../assets/Bg.jpg";
import emailjs from "@emailjs/browser";

const Ask = () => {
  const form = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailContent = {
      name: name,
      email: email,
      message: message,
    };

    emailjs
      .send(
        "service_wl24p53",
        "template_jbf94vm",
        emailContent,
        "3M4U8iV2zUxqNBFvr"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Wrap>
      <section className="contact">
        <div className="content">
          <h2>문의하기</h2>
        </div>
        <div className="container">
          <div className="contactInfo">
            <div className="box">
              <div className="icon">
                <IoMdMap />
              </div>
              <div className="text">
                <h3>주소</h3>
                <p>서울특별시 중구 필동로1길 30 (필동3가)</p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <IoIosCall />
              </div>
              <div className="text">
                <h3>전화</h3>
                <p>010-5337-3133</p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <IoIosMail />
              </div>
              <div className="text">
                <h3>Email</h3>
                <p>docop@dongguk.edu</p>
              </div>
            </div>
          </div>
          <div className="contactForm">
            <form ref={form} onSubmit={handleSubmit}>
              <h2>메세지 보내기</h2>
              <div className="inputBox">
                <input
                  type="text"
                  name="from_name"
                  required="required"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span>이름</span>
              </div>
              <div className="inputBox">
                <input
                  type="text"
                  name="email"
                  required="required"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span>메일</span>
              </div>
              <div className="inputBox">
                <textarea
                  name="message"
                  required="required"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <span>메세지를 적어주세요...</span>
              </div>
              <div className="inputBox">
                <input type="submit" name="" value="보내기"></input>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Wrap>
  );
};

export default Ask;

const Wrap = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  box-sizing: border-box;

  .contact {
    /* border: 1px solid green; */
    position: relative;
    min-height: 85vh;
    padding: 50px 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: url(${Bg});
    background-size: cover;

    .content {
      max-width: 800px;
      text-align: center;

      h2 {
        font-size: 50px;
        font-weight: 500;
        color: #fff;
      }
    }

    .container {
      /* border: 1px solid red; */
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70px;

      .contactInfo {
        /* border: 1px solid red; */
        width: 50%;
        display: flex;
        flex-direction: column;

        .box {
          /* border: 1px solid green; */
          position: relative;
          padding: 20px 0;
          display: flex;

          .icon {
            min-width: 80px;
            height: 80px;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            font-size: 40px;
          }

          .text {
            display: flex;
            margin-left: 20px;
            font-size: 25px;
            color: #fff;
            flex-direction: column;
            font-weight: 300;

            h3 {
              font-weight: 500;
              color: #00bcd4;
            }
          }
        }
      }

      .contactForm {
        width: 40%;
        padding: 40px;
        background: #fff;
        border-radius: 20px;

        h2 {
          font-size: 30px;
          color: #333;
          font-weight: 500;
        }

        .inputBox {
          position: relative;
          width: 100%;
          margin-top: 10px;

          input {
            width: 100%;
            padding: 5px 0;
            font-size: 16px;
            margin: 10px 0;
            border: none;
            border-bottom: 2px solid #333;
            outline: none;
            resize: none;
          }

          textarea {
            /* border: 1px solid red; */
            width: 100%;
            height: 35px;
            padding: 5px 0;
            font-size: 16px;
            margin: 10px 0;
            border: none;
            border-bottom: 2px solid #333;
            outline: none;
            resize: none;
            box-sizing: border-box;
          }

          span {
            position: absolute;
            left: 0;
            padding: 5px 0;
            font-size: 16px;
            margin: 10px 0;
            pointer-events: none;
            transition: 0.5s;
            color: #666;
          }

          input:focus ~ span,
          input:valid ~ span,
          textarea:focus ~ span,
          textarea:valid ~ span {
            color: #e91e63;
            font-size: 12px;
            transform: translateY(-20px);
          }

          input[type="submit"] {
            width: 100px;
            background: #00bcd4;
            color: #fff;
            border: none;
            cursor: pointer;
            padding: 10px;
            font-size: 18px;
            border-radius: 30px;
          }
        }
      }
    }
  }

  @media (max-width: 991px) {
    .contact {
      padding: 50px;
    }

    .container {
      flex-direction: column;

      .contactInfo {
        margin-bottom: 40px;
      }

      .contactInfo,
      .contactForm {
        width: 100%;
      }
    }
  }
`;
