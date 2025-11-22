import "./d.css";
import { MoveRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // <-- import useTranslation
import { Swiper, SwiperSlide } from "swiper/react";
import ch from "../../assets/church1.jpg";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

// Motion variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: "easeOut" } },
};
const fadeDown = { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: "easeOut" } } };

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

// Floating heart generator
const FloatingHearts = ({ count = 8 }) => {
  const hearts = Array.from({ length: count });
  return hearts.map((_, i) => {
    const left = Math.random() * 90 + "%";
    const size = Math.random() * 25 + 20;
    const delay = Math.random() * 2;
    const duration = Math.random() * 3 + 3;

    return (
      <motion.div
        key={i}
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: [0, -80, 0], opacity: [0, 1, 0.7] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          delay: delay,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "100%",
          bottom: "0",
          left: left,
          zIndex: 1000,
        }}
      >
        <Heart color="#ff6b81a6" size={size} />
      </motion.div>
    );
  });
};

const Detail = () => {
  const { t } = useTranslation("detail"); // <-- use the "detail" namespace

  return (
    <div
      className="detail_container"
      id="details"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Floating hearts */}
      <FloatingHearts count={15} />

      <h2 className="gallery_title" variants={fadeDown}>Our Special Day</h2>


      <div className="detail">
        {/* CHURCH SECTION */}
        <div className="detail_grid tto">
          <motion.div
            className="detail_sub"
            variants={fadeDown}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 className="wedding_main_tite" variants={fadeUp}>
              {t("church.title")}
            </motion.h2>
            <motion.img
              src="https://www.civitatis.com/f/espana/sevilla/guia/iglesia-divino-salvador-m.jpg"
              alt={t("church.title")}
              className="detail_img"
              variants={scaleIn}
            />
            <motion.h2 className="wedding_main_tite" variants={fadeUp}>
              {t("church.ceremony")}
            </motion.h2>

            <motion.div
              className="wedding_day_detail_section"
              variants={leftSlide}
            >
              <motion.h2 className="place_name" variants={fadeUp}>
                {t("church.placeName")}
              </motion.h2>
              <motion.h3 className="time" variants={fadeUp}>
                {t("church.time")}
              </motion.h3>
              <motion.a
                href={t("church.locationLink")}
                className="link"
                variants={rightSlide}
              >
                {t("church.locationLink")} <MoveRight color="#000" />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="detail_sub"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          ></motion.div>
        </div>

        {/* RECEPTION SECTION */}
        <div className="detail_grid tt">
          <motion.div
            className="detail_sub"
            variants={fadeDown}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          ></motion.div>

          <motion.div
            className="detail_sub"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 className="wedding_main_tite" variants={fadeUp}>
              {t("reception.title")}
            </motion.h2>
            <motion.img
              src="https://scontent.cdninstagram.com/v/t39.30808-6/469321267_18039067061258230_6331406145053302343_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzQyODA1OTE4NTE5NzM4MDI4Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwNzB4NzE2LnNkci5DMyJ9&_nc_ohc=G4T8BDOBhxAQ7kNvwHtuwvs&_nc_oc=AdnmM2vko548CgqHOFcyyibbCHPVV8JgLsQZPY7_e-xNd5_-1p2WTL676mXypbuQ8eg&_nc_ad=z-m&_nc_cid=1157&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=t004xyAcl2B44ViJJt8hZQ&oh=00_Afi8-hwAFk15oK4eifwt0-s0wFgawXQCFzDm1t5aHSXDZQ&oe=692545C6"
              alt={t("reception.title")}
              className="detail_img"
              variants={scaleIn}
            />
            <motion.div
              className="wedding_day_detail_section"
              variants={rightSlide}
            >
              <motion.h2 className="place_name" variants={fadeUp}>
                {t("reception.placeName")}
              </motion.h2>
              <motion.a
                href={t("reception.mapLink")}
                className="link rrr"
                variants={fadeUp}
              >
                {t("reception.locationLink")} <MoveRight color="#000" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
