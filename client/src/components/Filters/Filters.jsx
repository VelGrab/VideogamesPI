import { React } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByGenre, filterCreated, orderByName, orderByRating} from "../../redux/actions";
import style from "./Filters.module.css";
import { getAllGames } from "../../redux/actions";
import Loader from "../Loader/Loader";

export default function Filters({setCurrentPage}) {

  const dispatch = useDispatch()
  const [/*order*/, setOrder] = useState('')
  const [loader, setLoader] = useState(false)

  const handleFilterGenre = (e) => {
    dispatch(filterByGenre(e.target.value))
    setCurrentPage(1)
    setOrder('')
  }

  const handlerFilterCreated = (e) => {
    dispatch(filterCreated(e.target.value))
    setCurrentPage(1)
  }

  const handlerOrderAscDesc = (e) => {
    dispatch(orderByName(e.target.value))
    setOrder(e.target.value)
    setCurrentPage(1)
  }

  const handlerOrderRating = (e) => {
    dispatch(orderByRating(e.target.value))
    setOrder(e.target.value)
    setCurrentPage(1)
  }

  const handleClick = (e) => {
    setLoader(true)
    e.preventDefault();
    dispatch(getAllGames());
    setTimeout(() => {
      setLoader(false)
    }, 5000)
    setCurrentPage(1)
    setOrder('')
  };
  

  return (
    <div>
      {
        loader ? <Loader /> :
      <div className={style.filtersContainer}>
        <div>
          <select className={style.selectFilter} onChange={e => handlerOrderAscDesc(e)}>
            <option hidden>Ordenar por nombre</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
        <div>
          <select className={style.selectFilter} onChange={e => handlerFilterCreated(e)}>
            <option hidden>Todos</option>
            <option value='All'>Todos</option>
            <option value="creado">Creado</option>
            <option value="existente">Existente</option>
          </select>
        </div>
        <div>
          <select className={style.selectFilter} onChange={e => handleFilterGenre(e)}>
            <option hidden>Generos</option>
            <option value='All'>Todos</option>
            <option value='Action'>Action</option>
            <option value='Indie'>Indie</option>
            <option value='Adventure'>Adventure</option>
            <option value='RPG'>RPG</option>
            <option value='Strategy'>Strategy</option>
            <option value='Shooter'>Shooter</option>
            <option value='Casual'>Casual</option>
            <option value='Simulation'>Simulation</option>
            <option value='Racing'>Racing</option>
            <option value='Arcade'>Arcade</option>
            <option value='Puzzle'>Puzzle</option>
            <option value='Platformer'>Platformer</option>
            <option value='Sports'>Sports</option>
            <option value='Massively Multiplayer'>Massively Multiplayer</option>
            <option value='Fighting'>Fighting</option>
            <option value='Family'>Family</option>
            <option value='Educational'>Educational</option>
            <option value='Board Games'>Board Games</option>
            <option value='Card'>Card</option>
          </select>
        </div>
        <div>
          <select className={style.selectFilter} onChange={e => handlerOrderRating(e)}>
            <option hidden>Rating</option>
            <option value="min">Min</option>
            <option value="max">Max</option>
          </select>
        </div>
        <div>
          <button className={style.buttonReset} onClick={(e) => handleClick(e)}>Limpiar Filtros</button>
        </div>
      </div>
      }
    </div>
  );
}
