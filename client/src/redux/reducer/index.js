import {
  FILTER_BY_GENRE,
  FILTER_CREATED,
  GET_ALL_GAMES,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  SEARCH_VIDEOGAMES,
  POST_VIDEOGAMES,
  GET_ALL_GENRES,
  GET_DETAILS,
  GET_ALL_PLATFORMS
} from "../actions";

const initialState = {
  videogames: [],
  genres: [],
  allVideogames: [],
  detailGame: [],
  platforms: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES: {
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    }
    case FILTER_BY_GENRE: {
      const allVideogames = state.allVideogames;
      const statusFilter =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((e) =>
              !!e.createInDb
                ? e.genres.some((g) => g.name === action.payload)
                : e.genres.some((g) => g === action.payload)
            );
        if(statusFilter.length === 0) {
          alert("El genero no pertenece a ningun juego");
          return {
            ...state,
            videogames: state.allVideogames,
          };
        } else {
      return {
        ...state,
        videogames: statusFilter,
      };
    }
    }
    case FILTER_CREATED: {
      const allVideogamesCreated = state.allVideogames;
      const filterCreated =
        action.payload === "creado"
          ? allVideogamesCreated.filter((e) => e.createInDb)
          : allVideogamesCreated.filter((e) => !e.createInDb);
        if(filterCreated.length === 0) {
          alert("No hay juegos creados");
          return {
            ...state,
            videogames: allVideogamesCreated,
          }
        } else {
          return {
            ...state,
            videogames:
              action.payload === "All" ? state.allVideogames : filterCreated,
          };
        }
    }
    case ORDER_BY_NAME: {
      const sorted =
        action.payload === "asc"
          ? state.videogames.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
              return 0;
            });
      return {
        ...state,
        videogames: sorted.map((e) => e),
      };
    }
    case SEARCH_VIDEOGAMES: {
      let searchValid = action.payload;
      if (Array.isArray(searchValid)) {
        return {
          ...state,
          videogames: action.payload,
        };
      } else {
        return {
          ...state,
          videogames: 'NotFound',
        };
      }
    }
    case ORDER_BY_RATING: {
      const sortedByRating =
        action.payload === "min"
          ? state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) return 1;
              if (b.rating > a.rating) return -1;
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) return -1;
              if (b.rating > a.rating) return 1;
              return 0;
            });
      return {
        ...state,
        videogames: sortedByRating.map((e) => e),
      };
    }
    case POST_VIDEOGAMES: {
      return {
        ...state,
      };
    }
    case GET_ALL_GENRES: {
      return {
        ...state,
        genres: action.payload,
      };
    }
    case GET_DETAILS: {
      return {
        ...state,
        detailGame: action.payload,
      };
    }
    case GET_ALL_PLATFORMS: {
      return {
        ...state,
        platforms: action.payload
      }
    }
    default:
      return state;
  }
};

export default rootReducer;
