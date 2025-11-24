import React, { useState, useRef } from "react";
import "./tc.css";
import TravelHeader from "./TravelHeader";
import { CountryDropdown } from "./CountryDropdown";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import emailjs from "@emailjs/browser";
import Nav from "../nav/Nav";
import { useTranslation } from "react-i18next"; // <-- import useTranslation

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Travel = () => {
  const { t } = useTranslation("travel"); // <-- use travel namespace
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const sendEmailToAdmin = async () => {
    try {
      await emailjs.sendForm(
        "service_5a0rrlm",
        "template_fzdd1gj",
        formRef.current,
        "y0CbJ01qwSlHTKwSV"
      );
      console.log("Admin email sent");
    } catch (error) {
      console.error("EmailJS send error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      fullName: e.target.fullName.value,
      country: selectedCountry ? selectedCountry.name : "",
      specialRequests: e.target.specialRequests.value,
      email: e.target.email.value,
      status: "pending",
      createdAt: serverTimestamp(),
    };
    try {
      await addDoc(collection(db, "guestRequests"), formData);
      await sendEmailToAdmin();
      alert(t("formNote"));
      e.target.reset();
      setSelectedCountry(null);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <Nav />
      {/* <TravelHeader /> */}
      <div className="tros">
        <motion.div
          className="travel_container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariant}
        >
          <motion.div
            className="travels"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="travel_title">{t("title")}</h2>
            <div className="trave_sub_title">{t("subtitle")}</div>
            <p className="travel_desc">{t("description")}</p>
          </motion.div>

          <motion.div
            className="travels"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="dcv">
              <form
                ref={formRef}
                className="travel_form"
                onSubmit={handleSubmit}
              >
                <div className="form_input_section">
                  <label htmlFor="fullName" className="form_label">
                    {t("fullName")}
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder={t("fullName")}
                    className="form_input"
                    required
                  />
                </div>

                <div className="form_input_section">
                  <label className="form_label">{t("country")}</label>
                  <div className="naugthy">
                    <CountryDropdown
                      placeholder={t("countryPlaceholder")}
                      onChange={setSelectedCountry}
                      value={selectedCountry ? selectedCountry.alpha3 : ""}
                    />
                  </div>
                </div>

                <div className="form_input_section">
                  <label htmlFor="specialRequests" className="form_label">
                    {t("specialRequests")}
                  </label>
                  <input
                    type="text"
                    id="specialRequests"
                    name="specialRequests"
                    placeholder={t("specialRequestsPlaceholder")}
                    className="form_input"
                  />
                </div>

                <div className="form_input_section">
                  <label htmlFor="email" className="form_label">
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t("emailPlaceholder")}
                    className="form_input"
                    required
                  />
                </div>
                <div className="so">
                  <button type="submit" disabled={loading} className="linkaa hoho">
                    {loading ? t("submittingBtn") : t("submitBtn")}
                  </button>
                </div>

                <p
                  className="form_note"
                  style={{
                    marginTop: 8,
                    fontSize: "0.9rem",
                    color: "#555",
                    fontStyle: "italic",
                  }}
                >
                  {t("formNote")}
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="teal">
        <h2 className="near_title">{t("nearHotels")}</h2>

        <div className="hotel_grid">
          {[
            {
              name: "Axis Viana Business & Spa Hotel",
              img: "https://cdn2.paraty.es/axis-corpo/images/cf5822c06d57171=s500",
              link: "https://www.axishoteis.com/axis-viana.html",
            },
            {
              name: "Flor de Sal by The Editory",
              img: "https://www.editoryhotels.com/media/ccabjqs5/4.jpg?anchor=center&mode=crop&width=577&height=350&rnd=133881675686070000",
              link: "https://editoryhotels.com/flordesal/",
            },
            {
              name: "AP Dona Aninhas (AP Hotels & Resorts)",
              img: "https://ap-hotelsresorts.com/wp-content/uploads/cache/2023/05/Hotel-AP-Dona-Aninhas-em-Viana-do-Castelo-scaled-1/1757707684.jpg",
              link: "https://ap-hotelsresorts.com/hotel/dona-aninhas/",
            },
          ].map((hotel, i) => (
            <div className="ppp">
              <div className="hotel_sub" key={i}>
                <img src={hotel.img} alt={hotel.name} className="hotel_img" />
                <h2 className="hotel_name">{hotel.name}</h2>

                <div className="linkaa">
                  <a href={hotel.link} target="_blank" className="dd">
                    {t("hotelWebsite")}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Travel;
