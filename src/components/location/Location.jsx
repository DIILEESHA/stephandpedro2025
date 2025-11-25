import "./lo.css";
import a from "../../assets/aaa.jpg";
import ab from "../../assets/bbb.jpg";
import { useTranslation } from "react-i18next";

const Location = () => {
  const { t } = useTranslation("location");

  return (
    <div className="location_container">
      <div className="losi">
        <h2 className="location_title">{t("timeless_celebration")}</h2>
        <h2 className="cre">{t("venues")}</h2>

        <div className="location_grid">
          <div className="location_sub">
            <img src={ab} alt="" className="ocation_img" />
            <h2 className="location_name">{t("church_name")}</h2>
            <p
              className="ocation_addres"
              dangerouslySetInnerHTML={{ __html: t("church_address") }}
            />
            <div className="soo">
              <a
                target="_blank"
                href="https://maps.app.goo.gl/em9J3tQC2wYVCJAs8"
                className="linka"
              >
                {t("church_link")}
              </a>
            </div>
          </div>

          <div className="location_sub">
            <img src={a} alt="" className="ocation_img" />
            <h2 className="location_name">{t("quinta_name")}</h2>
            <p
              className="ocation_addres"
              dangerouslySetInnerHTML={{ __html: t("quinta_address") }}
            />
            <div className="soo">
              <a
                target="_blank"
                href=" https://maps.app.goo.gl/3jAfVDeEuYi2kBqs8
"
                className="linka"
              >
                {t("quinta_link")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
