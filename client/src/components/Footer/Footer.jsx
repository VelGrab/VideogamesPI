import React from "react";
import style from "./Footer.module.css";
import Linkedin from "../../images/linkedin.png";
import Github from "../../images/github.png";

export default function Footer() {
  return (
    <div>
      <div className={style.footerContainer}>
        <h4>Hecho con 💜 por: Julio Cesar!</h4>
        <div>
          <a
            href="https://www.linkedin.com/in/julio-cesar-pe%C3%B1a-estrada-312223213/"
            target="__BLANK"
          >
            <img className={style.imgSocialLinkedin} src={Linkedin} alt="Linkedin Img"></img>
          </a>

          <a href="https://github.com/VelGrab" target="__BLANK">
            <img className={style.imgSocialGithub} src={Github} alt="Github Img"></img>
          </a>
        </div>
      </div>
    </div>
  );
}
