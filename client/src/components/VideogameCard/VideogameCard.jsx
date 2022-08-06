import React from "react";
import style from "./VideogameCard.module.css";

// Con esta funcion creo el componente para los videojuegos que se mostraran

export default function VideogameCard({ name, image, genres, createInDb, rating, platforms }) {
  return (
    <div className={style.cardContainer}>
      <h2 className={style.titleCard}>{name}</h2>
      <img className={style.imgCard} src={image} alt={name} />
      {/* Aqui pregunto si en la base de datos existe  */}
      <p className={style.genreCard}>{!!createInDb
        // Si entra en esta condicion es porque existe en la base de datos y lo muestro
        // luego si en genres.length existe solo un genero lo muestro, y si no muestro todos los generos con un guion.
        ? genres.map((e, i) => {
            return i === genres.length - 1 ? e.name : e.name + " - ";
          })
        // En caso de que sea de la api hago el mismo procedimiento pero en este caso,
        // sin acceder a la propiedad name porque es diferente en la api que en genres de la base de datos
        : genres.map((e, i) => {
            return i === genres.length - 1 ? e : e + " - ";
          })}
      </p>
      <p  className={style.ratingCard}>Rating: {rating}</p>
    </div>
  );
}
