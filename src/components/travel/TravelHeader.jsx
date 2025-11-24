import "../header/h.css";
import headerimg from "../../assets/header1.jpg";

import { motion } from "framer-motion";
import headerimg3 from "../../assets/views.jpg";

const fadeUps = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: "easeOut" } },
};

const fadeDowns = {
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

const leftSlides = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.5, ease: "easeOut" } },
};

const rightSlides = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.5, ease: "easeOut" } },
};

const staggerGroups = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
};

const TravelHeader = () => {
  return (
    <motion.div
      className="header"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerGroups}
    >
      <motion.div className="header_log" variants={fadeDowns}>
        {/* <motion.div className="circle" variants={scaleIn}>
          <h2 className="cn">sp</h2>
        </motion.div> */}

        <motion.h2 className="trans" variants={fadeUps}>
          Transportation Info
        </motion.h2>

        <p className="mention_here">
          🚌 Shuttle bus from the Quinta to the church will be available. 🚗
          Uber code will be shared soon. Stay tuned!
        </p>
        <br />
        <div className="dd">
          <a href="/" className="linkaa">
            {" "}
            Back to Home
          </a>
        </div>

        {/* <motion.h3 className="wedding_date" variants={fadeUps}>
          August 22, 2026
        </motion.h3> */}
      </motion.div>

      <div className="header_grid">
        <motion.div className="header_sub" variants={leftSlides}>
          <img
            src="https://scontent.cdninstagram.com/v/t39.30808-6/469353067_18039064670258230_5884891233647675809_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MzI4ODIxMTM0Njc1NDQ2MTU5MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4OTU5LnNkci5DMyJ9&_nc_ohc=RlqFl9bd6VsQ7kNvwE2Ijs3&_nc_oc=Adl0ijTuDlnD-S7-ZiuMwK_aojLxI6cyk9xy1ZOc78ffTp-VRPq2Yg7-OZs5n7idL9k&_nc_ad=z-m&_nc_cid=1157&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=B_GYoul2K2NjpsyIFD8AkQ&oh=00_Afj6R-eIcZS4r2oxZ5mCzUxTwmB5l4GrZl7wunzV3myZAw&oe=6925DF75"
            alt=""
            className="header_img"
          />
        </motion.div>

        <motion.div className="header_sub xx" variants={rightSlides}>
          <img src={headerimg3} alt="" className="header_img" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TravelHeader;
