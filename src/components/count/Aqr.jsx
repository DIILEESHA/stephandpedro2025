import React, { useEffect, useState } from "react";
import "./co.css";
import { useTranslation } from "react-i18next";

const Aqr = () => {
  const { t } = useTranslation("countdown");

  const calculateTimeLeft = () => {
    const targetDate = new Date("2026-08-22T00:00:00");
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="count">
      <div className="count_container">
        <h2 className="main_title">{t("mainTitle")}</h2>
        <p className="count_para">{t("description")}</p>
      </div>
    </div>
  );
};

export default Aqr;
