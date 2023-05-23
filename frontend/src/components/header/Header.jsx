import { Wrap } from "./styles";
import { HomeOutline } from "react-ionicons";
import { PersonOutline } from "react-ionicons";
import { ChatboxOutline } from "react-ionicons";
import { CameraOutline } from "react-ionicons";
import { ConstructOutline } from "react-ionicons";
import { useRef, useState } from "react";

export default function Header() {
  const [activeLink, setActiveLink] = useState("Home");

  const navigationRef = useRef(null);

  const toggleHandle = () => {
    navigationRef.current.classList.toggle("active");
  };

  const links = [
    { name: "Home", icon: <HomeOutline />, color: "#f44336" },
    { name: "About", icon: <PersonOutline />, color: "#ffa117" },
    { name: "Messages", icon: <ChatboxOutline />, color: "#0fc70f" },
    { name: "Photos", icon: <CameraOutline />, color: "#2196f3" },
    { name: "Settings", icon: <ConstructOutline />, color: "#b145e9" },
  ];

  return (
    <Wrap activeColor={links.find((link) => link.name === activeLink).color}>
      <div ref={navigationRef} className="navigation">
        <div onClick={toggleHandle} className="menuToggle"></div>
        <ul>
          {links.map((link) => (
            <li
              className={`list ${activeLink === link.name ? "active" : ""}`}
              onClick={() => setActiveLink(link.name)}
            >
              <a href="#">
                <span className="icon">{link.icon}</span>
                <span className="text">{link.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Wrap>
  );
}
