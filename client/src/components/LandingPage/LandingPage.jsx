import React from "react";
import { Link } from "react-router-dom";
import bgLading from "../../images/bg-LandingPage.png"
import style from "./LandinPage.module.css";


export default function LadingPage() {
  return (
    <>
        <div className={style.container}>
          <img src={bgLading} alt="Background" className={style.img_background} />
        <Link className={style.link} to="/home">
          <div className={style.buttonContainer}>
            <button className={style.btn}>S t a r t</button>
          </div>
        </Link>
        </div>
    </>
  );
}
