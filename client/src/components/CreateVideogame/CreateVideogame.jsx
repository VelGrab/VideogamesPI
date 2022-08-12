import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGenres,
  postVideogames,
  getAllGames,
  getAllPlatforms,
} from "../../redux/actions";
import style from "./CreateVideogame.module.css";

const validateForm = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere un nombre";
  } else if (input.name.length < 3) {
    errors.name = "El nombre debe tener al menos 3 caracteres";
  }

  if (!input.description) {
    errors.description = "Se requiere una descripcion";
  } else if (
    /[A-Za-z0-9.,;:!?()"'%-]+/.test(input.description) &&
    input.description.length < 20
  ) {
    errors.description = "La descripcion debe tener al menos 20 caracteres";
  }

  if (!input.rating) {
    errors.rating = "Se requiere un rating del 1 al 5";
  } else if (input.rating < 1 || input.rating > 5) {
    errors.rating = "El rating debe estar entre 1 y 5";
  }

  if (!input.released) {
    errors.released = "Se requiere una fecha de lanzamiento";
  } else if (
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
      input.released
    )
  ) {
    errors.released = "La fecha de lanzamiento debe ser una fecha valida";
  }
  if (input.image === "") {
  } else if (
    !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#()?&//=]*)/.test(
      input.image
    )
  ) {
    errors.image = "La imagen debe ser una url valida";
  }

  return errors;
};

export default function CreateVideogame() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllGames());
    dispatch(getAllPlatforms());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelectGenre = (e) => {
    if (Object.values(input.genres).includes(e.target.value)) {
      alert("El genero ya fue seleccionado");
    } else {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
    }
  };

  const handleSelectPlatform = (e) => {
    if (Object.values(input.platforms).includes(e.target.value)) {
      alert("La plataforma ya fue seleccionada");
    } else {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    }
  };

  const handleDeleteGenres = (e) => {
    setInput({
      ...input,
      genres: input.genres.filter((genre) => genre !== e),
    });
  };

  const handleDeletePlatforms = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((platform) => platform !== e),
    });
  };

  const handleSubmitForm = (e) => {
    if (
      videogames.find(
        (videogame) => videogame.name.toLowerCase() === input.name.toLowerCase()
      )
    ) {
      alert("El videojuego ya existe");
      e.preventDefault();
    } else {
      e.preventDefault();
      if (input.platforms.length === 0) {
        return alert("Se requiere al menos 1 plataforma");
      } else if (input.platforms.length > 4) {
        return alert("Se pueden agregar maximo 4 plataformas");
      }
      if (input.genres.length === 0) {
        return alert("Se requiere al menos 1 genero");
      } else if (input.genres.length > 4) {
        return alert("Se pueden agregar maximo 4 generos");
      }
      dispatch(postVideogames(input));
      alert("¡Videojuego creado con exito!");
      setInput({
        name: "",
        description: "",
        image: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
      });
      history.push("/home");
    }
  };

  return (
    <div>
      <div className={style.containerForm}>
        <Link to="/home">
          <button className={style.buttonBack}>Volver</button>
        </Link>
        <div className={style.containerTitle}>
          <h1>Crear Videojuego</h1>
        </div>
        <form
          className={style.containerFormInside}
          onSubmit={(e) => handleSubmitForm(e)}
        >
          <div>
            <h5 className={style.textForm}>Nombre:</h5>
            <input
              className={style.inputForm}
              onChange={(e) => handleChange(e)}
              type="text"
              value={input.name}
              name="name"
            ></input>
            {errors.name && <p className={style.errorText}>{errors.name}</p>}
          </div>
          <div>
            <h5 className={style.textForm}>Descripción:</h5>
            <textarea
              className={style.inputFormDescription}
              onChange={(e) => handleChange(e)}
              type="text"
              value={input.description}
              name="description"
            ></textarea>
            {errors.description && (
              <p className={style.errorText}>{errors.description}</p>
            )}
          </div>
          <div>
            <h5 className={style.textForm}>Generos:</h5>
            <select
              className={style.selectForm}
              onChange={(e) => handleSelectGenre(e)}
            >
              <option hidden>Seleccionar Genero</option>
              {genres.map((e) => {
                return (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>
            <div className={style.containerButtonFormX}>
              {input.genres.map((e) => {
                return (
                  <div key={e}>
                    <button
                      className={style.buttonFormX}
                      onClick={() => handleDeleteGenres(e)}
                    >
                      {e}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          {errors.genres && <p className={style.errorText}>{errors.genres}</p>}
          <div>
            <h5 className={style.textForm}>Plataformas:</h5>
            <select
              className={style.selectForm}
              onChange={(e) => handleSelectPlatform(e)}
            >
              <option hidden>Seleccionar Plataforma</option>
              {platforms.map((e) => {
                return (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={style.containerButtonFormX}>
            {input.platforms
              ? input.platforms.map((e) => {
                  return (
                    <div key={e}>
                      <button
                        className={style.buttonFormX}
                        onClick={() => handleDeletePlatforms(e)}
                      >
                        {e}
                      </button>
                    </div>
                  );
                })
              : null}
          </div>
          {errors.platforms && (
            <p className={style.errorText}>{errors.platforms}</p>
          )}
          <div>
            <h5 className={style.textForm}>Fecha de lanzamiento:</h5>
            <input
              className={style.inputForm}
              onChange={(e) => handleChange(e)}
              type="date"
              value={input.released}
              name="released"
            ></input>
            {errors.released && (
              <p className={style.errorText}>{errors.released}</p>
            )}
          </div>
          <div>
            <h5 className={style.textForm}>Imagen:</h5>
            <input
              className={style.inputForm}
              onChange={(e) => handleChange(e)}
              type="text"
              value={input.image}
              name="image"
            ></input>
            <p className={style.errorText}>{errors.image}</p>
          </div>
          <div>
            <h5 className={style.textForm}>Rating:</h5>
            <input
              className={style.inputForm}
              onChange={(e) => handleChange(e)}
              type="number"
              step={0.1}
              value={input.rating}
              name="rating"
            ></input>
            {errors.rating && (
              <p className={style.errorText}>{errors.rating}</p>
            )}
          </div>
          <div>
            <button
              className={style.buttonCreate}
              disabled={Object.entries(errors).length === 0 ? false : true}
            >
              Crear Videojuego
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
