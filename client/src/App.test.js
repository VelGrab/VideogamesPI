// import { render, screen } from '@testing-library/react';
import rootReducer from "./redux/reducer/index";

describe("Reducer", () => {
  const state = {
    genres: [],
    allVideogames: [],
    detailGame: [],
    videogames: []
  };

  it("Debería retornar el estado inicial si no se pasa un type válido", () => {
    expect(rootReducer(undefined, [])).toEqual({
      allVideogames: [],
      genres: [],
      detailGame: [],
      videogames: []
    });
  });
});

