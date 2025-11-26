import React, { useEffect, useState } from "react";
import "./co.css";
import { useTranslation } from "react-i18next";

const Count = () => {
  const { t } = useTranslation("countdown");

  // Function to get ET time difference
  const calculateTimeLeft = () => {
    // Target date in Eastern Time
    const targetDateET = new Date(
      new Date("2026-08-22T00:00:00").toLocaleString("en-US", { timeZone: "America/New_York" })
    );
    const now = new Date();
    const difference = targetDateET - now;

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

        <div className="count_grid">
          <div className="count_sub">
            <h2 className="count_day">{timeLeft.days}</h2>
            <h3 className="count_value">{t("days")}</h3>
          </div>

          <div className="count_sub">
            <h2 className="count_day">{timeLeft.hours}</h2>
            <h3 className="count_value">{t("hours")}</h3>
          </div>

          <div className="count_sub">
            <h2 className="count_day">{timeLeft.seconds}</h2>
            <h3 className="count_value">{t("seconds")}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Count;
