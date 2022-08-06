import { React, useEffect, useState } from "react";
import { getDetails } from "../../redux/actions/index";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./VideogameDetail.module.css";
import Loader from "../Loader/Loader";

export default function VideogameDetail() {
  const dispatch = useDispatch();
  const videoGame = useSelector((state) => state.detailGame);
  const { id } = useParams();

  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true)
    dispatch(getDetails(id));
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [dispatch, id]);

  return (
    <div>
      { loader ? <Loader />
       :
      (
        <div className={style.containerBgDetail}>
          <div className={style.containerDetail}>
            <div className={style.containerImg}>
              <img
                className={style.imgDetail}
                src={videoGame.image}
                alt="Img"
              />
            </div>
            <div className={style.containerTitle}>
              <h2 className={style.detailTitle}>{videoGame.name}</h2>
            </div>
            <div className={style.containerDescription}>
              <div className={style.descriptionText}>
                Descripcion:
                {videoGame.description && (
                  <p>{videoGame.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                )}
              </div>
            </div>
            <div className={style.containerGpr}>
              <p className={style.dateText}>
                Año de lanzamiento: {videoGame.released}
              </p>
              <p className={style.ratingText}>Rating: {videoGame.rating}</p>
              <p className={style.platformsText}>
                Plataformas:{" "}
                {videoGame.platforms &&
                  videoGame.platforms.map((e, i) => {
                    return i === videoGame.platforms.length - 1 ? e : e + " - ";
                  })}
              </p>
              <p className={style.genresText}>
                Generos:{" "}
                {videoGame.createInDb
                  ? videoGame.genres.map((e, i) => {
                      return i === videoGame.genres.length - 1
                        ? e.name
                        : e.name + " - ";
                    })
                  : videoGame.genres &&
                    videoGame.genres.map((e, i) => {
                      return i === videoGame.genres.length - 1 ? e : e + " - ";
                    })}
              </p>
              <Link to="/home">
                <button className={style.btnBack}>Volver</button>
              </Link>
            </div>
          </div>
        </div>
      ) 
      }
    </div>
  );
}
