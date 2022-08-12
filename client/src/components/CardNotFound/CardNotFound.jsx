import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "./CardNotFound.module.css";
import gameNotFound from "../../images/notFoundVideogame.jpg";
import { getAllGames } from "../../redux/actions";

export default function CardNotFound() {
  const dispatch = useDispatch();
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    dispatch(getAllGames());
    return () => setDidMount(false);
  }, [dispatch]);

  if (!didMount) {
    return null;
  }

  return (
    <div>
      <div className={style.container}>
          <div>
            <img
              className={style.image}
              src={gameNotFound}
              alt="Not Found"
            ></img>
          </div>
      </div>
    </div>
  );
}
