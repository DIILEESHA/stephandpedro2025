import "./lo.css";
import a from "../../assets/aaa.jpg";
import ab from "../../assets/bbb.jpg";
const Location = () => {
  return (
    <div className="location_container">

        <div className="losi">

      <h2 className="location_title">a timeless celebation for us</h2>

      <h2 className="cre">ceremony & reception venues</h2>

      <div className="location_grid">
        <div className="location_sub">
          <img src={ab} alt="" className="ocation_img" />
          <h2 className="location_name">igreja Divino Salvador de Gandra</h2>

          <p className="ocation_addres">
            igreja Divino Salvador de Gandra
            <br />
            4930-325 Gandra, Portugal
          </p>
          <div className="soo">
            <a
              href="https://maps.app.goo.gl/em9J3tQC2wYVCJAs8"
              className="linka"
            >
             location link
            </a>
          </div>
        </div>

        <div className="location_sub">
          <img src={a} alt="" className="ocation_img" />
          <h2 className="location_name">Quinta da Malaposta </h2>

          <p className="ocation_addres">
            Largo Virgínio Fiúza Vila Nova de Cerveira,
            <br />
            4920-080 Vila Nova de Cerveira, Portugal
          </p>
          <div className="soo">
            <a
              href="https://maps.app.goo.gl/em9J3tQC2wYVCJAs8"
              className="linka"
            >
             location link
              
            </a>
          </div>
        </div>
      </div>
    </div>
        </div>
  );
};

export default Location;
