import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setScrollY(scrollPosition);
      console.log("Scroll Position: ", scrollPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let marker = document.querySelector("#marker");
    let item = document.querySelectorAll("nav a");

    function indicator(e) {
      marker.style.left = e.offsetLeft + "px";
      marker.style.width = e.offsetWidth + "px";
    }

    indicator(item[0]);

    item.forEach((link) => {
      link.addEventListener("click", (e) => {
        indicator(e.target);

        if (e.target.innerText === "서비스 소개") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    });
  }, []);

  return (
    <Wrap scrollY={scrollY}>
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
  color: #fff;
  z-index: 100005;
  height: 100px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: ${(props) => (props.scrollY > 1 ? "black" : "transparent")};
  transition: 0.5s;
  width: 100%;

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
      font-size: 2.5em;
      color: #fff;
      text-decoration: none;
    }

    nav > a:nth-child(4) {
      padding: 10px 20px;
      background: rgba(255, 239, 0, 0.8);
      border-radius: 20px;
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
