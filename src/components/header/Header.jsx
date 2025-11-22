import "./h.css";
import headerimg from "../../assets/header1.jpg";
import headerimg2 from "../../assets/header2.jpg";

import { motion } from "framer-motion";
import Nav from "../nav/Nav";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: "easeOut" } },
};

const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.6, ease: "easeOut" },
  },
};

const leftSlide = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.5, ease: "easeOut" } },
};

const rightSlide = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.5, ease: "easeOut" } },
};

const staggerGroup = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
};

const Header = () => {
  return (
    <div className="ff">
      <Nav />
      <motion.div
        className="header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerGroup}
      >
        <motion.div className="header_log" variants={fadeDown}>
          <motion.div className="circle" variants={scaleIn}>
            <h2 className="cn">sp</h2>
          </motion.div>

          <motion.h2 className="couple_name" variants={fadeUp}>
            stepahanie & pedro
          </motion.h2>

          <motion.h3 className="wedding_date" variants={fadeUp}>
            August 22, 2026
          </motion.h3>
        </motion.div>

        <div className="header_grid">
          <motion.div className="header_sub" variants={leftSlide}>
            <img src={headerimg} alt="" className="header_img" />
          </motion.div>

          <motion.div className="header_sub xx" variants={rightSlide}>
            <img src={headerimg2} alt="" className="header_img" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;
