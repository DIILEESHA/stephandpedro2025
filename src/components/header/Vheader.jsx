import React, { useState, useEffect } from "react";
import "./v.css";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Nav from "../nav/Nav";

import header from "../../assets/header1.jpg";
import header2 from "../../assets/header2.jpg";

const nameVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const andImageVariant = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut", yoyo: Infinity },
  },
};

const dateVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const textVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const scrollToSection = (id, closeMenu) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  if (closeMenu) closeMenu();
};

const slideshowImages = [header, header2];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header">
      {/* Slideshow background */}
      {slideshowImages.map((img, index) => (
        <div
          key={index}
          className="slideshow-image"
          style={{
            backgroundImage: `url(${img})`,
            opacity: index === currentImageIndex ? 1 : 0,
            zIndex: index === currentImageIndex ? 0 : -1,
          }}
        />
      ))}

      <Nav />

      {/* Mobile nav menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu">
          <div className="doee">
            <div
              className="mobile-nav_list"
              onClick={() =>
                scrollToSection("dettagli", () => setMobileMenuOpen(false))
              }
            >
              DETTAGLI
            </div>
            <div
              className="mobile-nav_list"
              onClick={() =>
                scrollToSection("regalo", () => setMobileMenuOpen(false))
              }
            >
              REGALO
            </div>
            <div
              className="mobile-nav_list"
              onClick={() =>
                scrollToSection("album", () => setMobileMenuOpen(false))
              }
            >
              CARICA FOTO
            </div>
          </div>
        </div>
      )}

      <motion.div className="couple_name_section">
        <motion.h2
          className="couple_nam"
          initial="hidden"
          animate="visible"
          variants={nameVariant}
          transition={{ delay: 0.1 }}
        >
          stephanie
        </motion.h2>
        <motion.h2 className="couple_nam hh">& </motion.h2>
        <motion.h2
          className="couple_nam km"
          initial="hidden"
          animate="visible"
          variants={nameVariant}
          transition={{ delay: 0.5 }}
        >
          pedro
        </motion.h2>
      </motion.div>

      <motion.div className="bottom_section">
        <motion.div className="bottom_date">
          <motion.div
            className="sections dum"
            initial="hidden"
            animate="visible"
            variants={dateVariant}
            transition={{ delay: 0.6 }}
          >
            <h1 className="bottom_name">SATURDAY</h1>
          </motion.div>
          <motion.div
            className="sections sum"
            initial="hidden"
            animate="visible"
            variants={dateVariant}
            transition={{ delay: 0.8 }}
          >
            <h1 className="bottom_dates">22</h1>
          </motion.div>
          <motion.div
            className="sections rum"
            initial="hidden"
            animate="visible"
            variants={dateVariant}
            transition={{ delay: 1 }}
          >
            <h1 className="bottom_name z">AUGUST</h1>
          </motion.div>
        </motion.div>
        <motion.p
          className="bottom_para"
          initial="hidden"
          animate="visible"
          variants={textVariant}
          transition={{ delay: 1.2 }}
        >
    They joyfully announce their wedding
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Header;
