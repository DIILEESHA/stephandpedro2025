import "./g.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

import img1 from "../../assets/gallery1.jpg";
import img2 from "../../assets/gallery2.jpg";
import img3 from "../../assets/gallery3.jpg";
import img4 from "../../assets/gallery4.jpg";
import img5 from "../../assets/gallery5.jpg";
import img6 from "../../assets/gallery6.jpg";
import { MoveRight } from "lucide-react";

const blogImages = [img1, img2, img3, img4, img5, img6];

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <motion.div
    id="gallery"
      className="gallery_container"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeUp}
    >
      <h2 className="gallery_title">Gallery of Love</h2>

      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {blogImages.map((img, index) => (
          <SwiperSlide key={index}>
            <motion.img
              src={img}
              alt={`Slide ${index + 1}`}
              className="gallery_image"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { delay: index * 0.2 } }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="doha">
        <motion.a
          href="https://maps.app.goo.gl/3jAfVDeEuYi2kBqs8"
          className="link se"
          variants={fadeUp}
        >
          Rsvp <MoveRight color="#000" />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default Gallery;
