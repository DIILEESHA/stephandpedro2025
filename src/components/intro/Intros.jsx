import "./intro.css";
import mo from "../../assets/gallery9.jpg";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Framer motion variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: "easeOut" } },
};
const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: "easeOut" } },
};
const leftSlide = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.6, ease: "easeOut" } },
};
const rightSlide = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.6, ease: "easeOut" } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.6, ease: "easeOut" },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
};

const Intros = () => {
  const { t } = useTranslation("home"); // use the "home" namespace

  return (
    <motion.div
      className="intro"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={stagger}
    >
      <div className="intro_container">
        <div className="intro_grid">
          {/* IMAGE */}

          {/* TEXT BLOCK */}
          <motion.div className="intro_sub cos" variants={rightSlide}>


            <div className="ppp">

            <img className="hey" src={mo} alt="" />
            </div>

            <motion.h1 className="intro_title" variants={fadeDown}>
              {t("ourStory.title")}
            </motion.h1>

            <motion.p className="intro_para" variants={fadeUp}>
              {t("ourStory.paragraph")}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Intros;
