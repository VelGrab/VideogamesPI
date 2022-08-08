import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../redux/actions";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader.jsx";
import Filters from "../Filters/Filters";
import VideogameCard from "../VideogameCard/VideogameCard";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css";
import LogoHome from "../../images/logoHome.png";
import CardNotFound from "../CardNotFound/CardNotFound";
import Footer from '../Footer/Footer'

export default function Home() {
  // declaro el dispatch para las acciones
  const dispatch = useDispatch();
  // declaro el state
  const allVideogames = useSelector((state) => state.videogames);
  // declaro un currentPage para el paginado
  const [currentPage, setCurrentPage] = useState(1);
  // declaro un gamesPerPage para el paginado
  const [gamesPerPage /*setGamesPerPage*/] = useState(15);
  // declaro un indice del ultimo videojuego para el paginado y lo multiplico por el gamesPerPage
  const indexOfLastGame = currentPage * gamesPerPage;
  // declaro un indice del primer videojuego para el paginado y resto el lastGame por el gamesPerPage
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  // declaro un currentGames y luego con el slice obtengo los videojuegos que se van a mostrar
  const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame);
  // declaro una constante para el paginado y le asigno el State setCurrentPage
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // En el UseEffect se ejecuta cuando el componente se carga, le paso la funcion
  // getAllGames que viene de la accion
  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    // renderizo el componente
    <div className={style.containerHome}>
      {currentGames.length > 0 ? (
        <div>
          <div className={style.containerNav}>
            <img
              className={style.homeLogo}
              src={LogoHome}
              alt="Home Logo"
            ></img>
          <SearchBar setCurrentPage={setCurrentPage} />
            <Link to="/createvideogame">
              <button className={style.buttonCreate}>Crear Videojuego</button>
            </Link>
          </div>
          <Filters 
           setCurrentPage = {setCurrentPage}
          />
          <Pagination
            gamesPerPage={gamesPerPage}
            allVideogames={allVideogames.length}
            paginate={paginate}
            currentPage={currentPage}
            changePage={changePage}
          />
          <div className={style.containerCards}>
            {currentGames !== "NotFound" ? (
              currentGames?.map((e) => {
                return (
                  <div key={e.name}>
                    <div>
                      <Link
                        className={style.linkHome}
                        to={`/videogame/${e}`}
                      >
                        <VideogameCard
                          name={e.name}
                          image={e.image}
                          rating={e.rating}
                          createInDb={e.createInDb}
                          genres={e.genres}
                        />
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <CardNotFound />
            )}
          </div>
          <Footer />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
