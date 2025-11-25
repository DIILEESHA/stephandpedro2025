"use client";
import Nav from "../nav/Nav";
import "./vg.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";

import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import vgalery1 from "../../assets/gallery1.jpg";
import vgalery2 from "../../assets/gallery2.jpg";
import vgalery3 from "../../assets/gallery3.jpg";
import vgalery4 from "../../assets/gallery4.jpg";
import vgalery5 from "../../assets/gallery5.jpg";
import vgalery6 from "../../assets/gallery6.jpg";
import vgalery7 from "../../assets/gallery7.jpg";
import vgalery8 from "../../assets/gallery8.jpg";
import vgalery9 from "../../assets/gallery9.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const imageAnim = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const Vgallery = () => {
  const { t } = useTranslation("gallery");
  const [open, setOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const images = [
    vgalery1, vgalery2, vgalery3, vgalery4, vgalery5,
    vgalery6, vgalery7, vgalery8, vgalery9
  ];

  const lightboxSlides = images.map((img) => ({ src: img }));

  return (
    <div className="vs">
      <Nav />

      <div className="vgallery">
        <div className="gallery_section">
          <motion.h2
            className="vgallery_title"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {t("title")}
          </motion.h2>

          <motion.p
            className="vgallery_para"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            className="vgalery_grid"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {images.map((img, i) => (
              <motion.div
                className="vgallery_sub"
                key={i}
                variants={imageAnim}
                onClick={() => { setSlideIndex(i); setOpen(true); }}
              >
                <div className="img_overlay">
                  <ZoomIn className="zoom_icon" />
                </div>
                <img src={img} alt={`gallery-${i}`} className="vimgs" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={slideIndex}
          slides={lightboxSlides}
          plugins={[Thumbnails]}
        />
      )}
    </div>
  );
};

export default Vgallery;
