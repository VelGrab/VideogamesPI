import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  searchVideoGames } from "../../redux/actions/index";
import style from "./SearchBar.module.css";
import Loader from "../Loader/Loader";

export default function SearchBar({setCurrentPage}) {
  const dispatch = useDispatch();
  const [gameName, setGameName] = useState("");
  const [loader, setLoading] = useState(false);

  const handleInputChange = (e) => {
    e.preventDefault();
    setGameName(e.target.value);
  };

  const handleSubmit = (e) => {
    if (!gameName) return alert("Ingrese un nombre de videojuego");
    e.preventDefault();
    setLoading(true);
    dispatch(searchVideoGames(gameName));
    setCurrentPage(1)
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    setGameName("");
  };

  return (
    <div>
      {  loader ? <Loader /> :
        <div className={style.containerLoader}>
          <input
            className={style.input}
            onChange={(e) => handleInputChange(e)}
            value={gameName}
            type="text"
            placeholder="Buscar Videojuego"
          ></input>
          <button
            className={style.buttonSearch}
            onClick={(e) => handleSubmit(e)}
            type="submit"
          >
            Buscar
          </button>
        </div>
      }
    </div>
  );
}
