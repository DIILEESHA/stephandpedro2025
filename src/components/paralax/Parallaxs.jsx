import "./p.css";
import { Parallax } from "react-scroll-parallax";
import cof from "../../assets/us.jpg";
import cof1 from "../../assets/us1.jpg";
import cof2 from "../../assets/us2.jpg";
import cof3 from "../../assets/us3.jpg";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";
import { useTranslation } from "react-i18next"; // <-- import useTranslation

const Parallaxs = () => {
  const { t } = useTranslation("parallax"); // <-- use "parallax" namespace
  const weddingDate = new Date("2026-08-22T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, sec: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = weddingDate - now;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        sec: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2 } } };
  const zoomSoft = { hidden: { opacity: 0, scale: 1.05 }, visible: { opacity: 1, scale: 1, transition: { duration: 1.4 } } };
  const float = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 2, delay: 0.3 } } };

  return (
    <div className="para">
      <div>
        <motion.div className="" variants={zoomSoft} initial="hidden" whileInView="visible">
          <div className="paralx_one">
            <h2 className="parallx_titles">{t("title")}</h2>
            <p className="parallax_paras">{t("description")}</p>
            <a href="travel" className="link uo">
              {t("linkText")} <MoveRight color="#fff" />
            </a>
          </div>
        </motion.div>

        <div className="paraax_grid">
          {/* DAYS */}
          <motion.div className="pa_sub" variants={fadeUp} initial="hidden" whileInView="visible">
            <motion.div variants={float} className="ho">
              <h2 className="dates">{timeLeft.days}</h2>
            </motion.div>
            <motion.div variants={float} className="dom">
              <h2 className="days">{t("daysLabel")}</h2>
            </motion.div>
            <motion.img variants={zoomSoft} className="sada marai" src={cof1} alt="parallax-img" />
          </motion.div>

          {/* HOURS */}
          <motion.div className="pa_sub" variants={fadeUp} initial="hidden" whileInView="visible">
            <motion.div variants={float} className="ho">
              <h2 className="dates">{timeLeft.hours}</h2>
            </motion.div>
            <motion.div variants={float} className="dom">
              <h2 className="days">{t("hoursLabel")}</h2>
            </motion.div>
            <motion.img variants={zoomSoft} className="sada marai" src={cof2} alt="parallax-img" />
          </motion.div>

          {/* SECONDS */}
          <motion.div className="pa_sub" variants={fadeUp} initial="hidden" whileInView="visible">
            <motion.div variants={float} className="ho">
              <h2 className="dates">{timeLeft.sec}</h2>
            </motion.div>
            <motion.div variants={float} className="dom">
              <h2 className="days">{t("secLabel")}</h2>
            </motion.div>
            <motion.img variants={zoomSoft} className="sada marai" src={cof3} alt="parallax-img" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Parallaxs;
