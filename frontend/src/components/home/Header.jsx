import React, { useEffect } from "react";
import styled from "styled-components";
import Logo from "../../assets/Logo.png";

const Header = () => {
  let marker = document.querySelector("#marker");
  let item = document.querySelectorAll("nav a");

  useEffect(() => {
    function indicator(e) {
      marker.style.left = e.offsetLeft + "px";
      marker.style.width = e.offsetWidth + "px";
    }

    item.forEach((link) => {
      link.addEventListener("click", (e) => {
        indicator(e.target);
      });
    });
  }, []);

  return (
    <Wrap>
      <div className="headerWrap">
        <div className="leftWrap">
          <div className="logoBx">
            <img src={Logo} />
          </div>
        </div>
        <nav>
          <div id="marker"></div>
          <a>서비스 소개</a>
          <a>문의</a>
          <a>시작하기</a>
        </nav>
      </div>
    </Wrap>
  );
};

export default Header;

const Wrap = styled.div`
  margin-top: 20px;
  color: #fff;

  .headerWrap {
    width: 100vw;
    display: flex;
    justify-content: space-evenly;

    .leftWrap {
      display: flex;
      justify-content: center;
      width: 10vw;

      .logoBx {
        width: 6vw;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    nav {
      width: 50vw;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: end;
    }

    nav a {
      cursor: pointer;
      position: relative;
      margin: 0 20px;
      font-size: 2em;
      color: #fff;
      text-decoration: none;
    }

    nav #marker {
      position: absolute;
      left: 0;
      height: 4px;
      width: 0;
      background: #fff;
      top: 60px;
      transition: 0.5s;
      border-radius: 4px;
    }
  }
`;
