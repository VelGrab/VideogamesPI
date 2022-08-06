import React from "react";
import style from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={style.containerPrueba}>
      <span className={style.loader}></span>
      {/* <div className={style.containerLoader}>
        <div className={style.loader}>
          <svg viewBox="0 0 80 80">
            <circle id="test" cx="40" cy="40" r="32"></circle>
          </svg>
        </div>

        <div className={style.loader}>
          <div className={style.triangle}>
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
          </div>
        </div>

        <div className={style.loader}>
          <svg viewBox="0 0 80 80">
            <rect x="8" y="8" width="64" height="64"></rect>
          </svg>
        </div>
      </div> */}
    </div>
  );
}
