import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "./CardNotFound.module.css";
import gameNotFound from "../../images/notFoundVideogame.jpg";
import { getAllGames } from "../../redux/actions";
import Loader from "../Loader/Loader";

export default function CardNotFound() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    dispatch(getAllGames());
    return () => setDidMount(false);
  }, [dispatch]);

  if (!didMount) {
    return null;
  }

  const handleClick = (e) => {
    setLoader(true);
    e.preventDefault();
    setTimeout(() => {
      setLoader(false);
    }, 5000);
  };

  return (
    <div>
      <div className={style.container}>
        {loader ? (
          <Loader />
        ) : (
          <div>
            <img
              className={style.image}
              src={gameNotFound}
              alt="Not Found"
            ></img>
            <button className={style.button} onClick={(e) => handleClick(e)}>
              Volver
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
