"use client";
import { MoveRight, Menu, X } from "lucide-react";
import { Dropdown, Menu as AntMenu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./n.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
    document.body.style.overflow = open ? "auto" : "hidden";
  };

  const closeMenu = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -150;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleDetailsClick = () => {
    closeMenu();
    if (location.pathname === "/") {
      scrollToSection("details");
    } else {
      navigate("/", { state: { scrollTo: "details" } });
    }
  };

  const gala = () => {
    closeMenu();
    if (location.pathname === "/") {
      scrollToSection("gallery");
    } else {
      navigate("/", { state: { scrollTo: "gallery" } });
    }
  };

  // Ant Design language menu
  const languageMenu = (
    <AntMenu
      onClick={(e) => i18n.changeLanguage(e.key)}
      items={[
        { key: "en", label: "EN" },
        { key: "pt", label: "PT" },
      ]}
    />
  );

  return (
    <>
      <div className="nav_container">
        {/* Desktop Nav */}
        <ul className="nav_ul desktop_nav">
          <li className="nav_li">
            <Dropdown overlay={languageMenu} placement="" arrow>
              <span style={{ cursor: "pointer" }}>
                {i18n.language.toUpperCase()} <DownOutlined />
              </span>
            </Dropdown>
          </li>
          <li className="nav_li">
            <a href="/">Home</a>
          </li>
          <li className="nav_li" onClick={handleDetailsClick}>
            Details
          </li>
          <li className="nav_li" onClick={() => navigate("/where-to-stay")}>
            Where to Stay
          </li>
          <li className="nav_li" onClick={gala}>
            Gallery
          </li>
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="https://docs.google.com/forms/d/e/1FAIpQLSfPsXdY5mb40sHleLMY1yFHMWcAUiX9WZvHjEOejlKnpxDznw/viewform?usp=sharing&ouid=107355289206639223256"
          >
            <li className="nav_li last" onClick={() => scrollToSection("rsvp")}>
              RSVP <MoveRight color="#fff" />
            </li>
          </a>

          {/* Language Dropdown */}
        </ul>
        {/* Mobile menu icon */}
        <div className="mobile_menu_icon">
          <div>
            <Menu size={30} color="#fff" onClick={toggleMenu} />
          </div>

          <div>
            <Dropdown overlay={languageMenu} placement="bottomLeft" arrow>
              <span style={{ cursor: "pointer", color: "#fff" }}>
                {i18n.language.toUpperCase()} <DownOutlined />
              </span>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {open && <div className="mobile_overlay" onClick={closeMenu}></div>}

      {/* Mobile Drawer */}
      <div className={`mobile_drawer ${open ? "open" : ""}`}>
        <div className="mobile_drawer_header">
          <X size={30} color="#fff" onClick={toggleMenu} />
        </div>

        <ul className="mobile_nav_ul">
          <li
            onClick={() => {
              closeMenu();
              navigate("/");
            }}
          >
            Home
          </li>
          <li onClick={handleDetailsClick}>Details</li>
          <li
            onClick={() => {
              closeMenu();
              navigate("/where-to-stay");
            }}
          >
            Where to Stay
          </li>
          <li onClick={gala}>Gallery</li>
          <a
            style={{ color: "inherit", textDecoration: "none" }}
            href="https://docs.google.com/forms/d/e/1FAIpQLSfPsXdY5mb40sHleLMY1yFHMWcAUiX9WZvHjEOejlKnpxDznw/viewform?usp=sharing&ouid=107355289206639223256"
          >
            <li
              className="mobile_last"
              onClick={() => {
                closeMenu();
                scrollToSection("rsvp");
              }}
            >
              RSVP <MoveRight color="#fff" />
            </li>
          </a>

          {/* Language Dropdown Mobile */}
        </ul>
      </div>
    </>
  );
};

export default Nav;
