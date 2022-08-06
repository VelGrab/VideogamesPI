import React from "react";
import style from "./Pagination.module.css";

export default function Pagination({ gamesPerPage, allVideogames, paginate, changePage, currentPage }) {
  // Creo un array vacio para los numeros de paginas
  const pageNumbers = [];

  // Hago un for para que se creen tantos numeros de paginas como videojuegos el Math.ceil redondea hacia arriba
  // Luego lo divido entre allVideogames por el gamesPerPage para despues pushearlo al array
  for (let i = 1; i <= Math.ceil(allVideogames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  }

  const handleNext = () => {
    if (currentPage < pageNumbers.length) {
      changePage(currentPage + 1);
    }
  }

  return (
    <div>
      <div className={style.paginationContainer}>
        <button className={style.buttonPrevious} onClick={handlePrevious}>←</button>
          {pageNumbers.map((e) => (
            <div key={e}>
              <p className={currentPage === e ? style.active : style.paginationClick} onClick={() => paginate(e)}>{e}</p>
            </div>
          ))}
        <button className={style.buttonNext} onClick={handleNext}>→</button>
      </div>
    </div>
  );
}
