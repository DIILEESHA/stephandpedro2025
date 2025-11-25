"use client";
import { MoveRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import usaflag from "../../assets/usa.png";
import ptflag from "../../assets/pt.png";
import logo from "../../assets/logo.png";

import "./n.css";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n, t } = useTranslation("nav");
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [open, setOpen] = useState(false);
  const [animateFlags, setAnimateFlags] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateFlags(true), 250);
  }, []);

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

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
  };

  return (
    <>
      <div className="nav_container">
        {/* DESKTOP NAV */}
        <div className="all desktop_nav">
          <div className="logo">
            <a href="/">
              <img src={logo} alt="" className="ddds" />
            </a>
          </div>

          <div className="another">
            <ul className="nav_ul">
              <li className="nav_li" onClick={handleDetailsClick}>
                {t("details")}
              </li>
              <li className="nav_li" onClick={() => navigate("/where-to-stay")}>
                {t("whereToStay")}
              </li>
              <li className="nav_li">
                <a href="gallery">{t("gallery")}</a>
              </li>{" "}
              <li className="nav_li">
                <a href="transport">{t("transport")}</a>
              </li>
              {/* 🌍 FLAGS */}
              <li className="nav_li lang_flags">
                <motion.img
                  src={usaflag}
                  alt="English"
                  className={`lang_flag ${
                    currentLang === "en" ? "active_flag" : ""
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={animateFlags ? { scale: 1, opacity: 1 } : {}}
                  transition={{ type: "spring", stiffness: 120, damping: 10 }}
                  onClick={() => handleLanguageChange("en")}
                />

                <motion.img
                  src={ptflag}
                  alt="Portuguese"
                  className={`lang_flag ${
                    currentLang === "pt" ? "active_flag" : ""
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={animateFlags ? { scale: 1, opacity: 1 } : {}}
                  transition={{ type: "spring", stiffness: 120, damping: 10 }}
                  onClick={() => handleLanguageChange("pt")}
                />
              </li>
            </ul>
          </div>
        </div>

        {/* MOBILE TOP BAR */}

        <div className="mobile_menu_icon">
          <div>
            <Menu size={30} color="#fff" onClick={toggleMenu} />
          </div>

          <div className="mobile_flag_wrap">
            <motion.img
              src={usaflag}
              alt="English"
              className={`lang_flag ${
                currentLang === "en" ? "active_flag" : ""
              }`}
              initial={{ scale: 0, opacity: 0 }}
              animate={animateFlags ? { scale: 1, opacity: 1 } : {}}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
              onClick={() => handleLanguageChange("en")}
            />

            <motion.img
              src={ptflag}
              alt="Portuguese"
              className={`lang_flag ${
                currentLang === "pt" ? "active_flag" : ""
              }`}
              initial={{ scale: 0, opacity: 0 }}
              animate={animateFlags ? { scale: 1, opacity: 1 } : {}}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
              onClick={() => handleLanguageChange("pt")}
            />
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      {open && <div className="mobile_overlay" onClick={closeMenu}></div>}

      {/* MOBILE DRAWER */}
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
          <li onClick={() => navigate("/where-to-stay")}>Where to Stay</li>
          <li onClick={gala}>Gallery</li>
          <li className="">
            <a href="transport">transport</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Nav;
