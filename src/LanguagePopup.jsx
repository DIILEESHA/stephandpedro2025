"use client";
import { Modal, Button } from "antd";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import usaflag from "./assets/usa.png";
import ptflag from "./assets/pt.png";
import { useTranslation } from "react-i18next";

const LanguagePopup = () => {
  const { i18n } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [animateFlags, setAnimateFlags] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      setAnimateFlags(true);
    }, 5000); // show after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setVisible(false); // close modal after selection
  };

  return (
    <Modal
      open={visible}
      footer={null}
      closable={true}
      centered
      className="language_modal"
    >
      <div className="modal_content">
        <h2>Choose Your Language</h2>
        <div className="flag_buttons">
          <motion.img
            src={usaflag}
            alt="English"
            className={`lang_flag ${
              i18n.language === "en" ? "active_flag" : ""
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
              i18n.language === "pt" ? "active_flag" : ""
            }`}
            initial={{ scale: 0, opacity: 0 }}
            animate={animateFlags ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
            onClick={() => handleLanguageChange("pt")}
          />
        </div>
      </div>
    </Modal>
  );
};

export default LanguagePopup;
