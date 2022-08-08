import axios from "axios";

export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const SEARCH_VIDEOGAMES = "SEARCH_VIDEOGAMES";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const POST_VIDEOGAMES = "POST_VIDEOGAMES"
export const GET_DETAILS = "GET_DETAILS";
export const GET_ALL_PLATFORMS = "GET_ALL_PLATFORMS"


// Con esta action se obtienen todos los videojuegos.
export const getAllGames = () => {
  return async function (dispatch) {
    const response = await axios.get(`/videogames`);
    return dispatch({
      type: GET_ALL_GAMES,
      payload: response.data,
    });
  }
};

export const filterByGenre = (payload) => {
  return {
    type: FILTER_BY_GENRE,
    payload,
  };
}

export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload
  }
}

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload
  }
}

export const searchVideoGames = (name) => {
  return async function(dispatch) {
    try {
      let response = await axios.get(`/videogames?name=` + name)
      return dispatch({
        type: SEARCH_VIDEOGAMES,
        payload: response.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const orderByRating = (payload) => {
  return {
    type: ORDER_BY_RATING,
    payload
  }
}

export const getAllGenres = () => {
  return async function (dispatch) {
    const response = await axios.get(`/genres`)
    return dispatch({
      type: GET_ALL_GENRES,
      payload: response.data
    })
  }
}

export const getAllPlatforms = () => {
  return async function (dispatch) {
    const response = await axios.get(`/platforms`)
    return dispatch({
      type: GET_ALL_PLATFORMS,
      payload: response.data
    })
  }
}

export const postVideogames = (payload) => {
  return async function (dispatch) {
  try {
    const response = await axios.post('/videogames', payload)
    return response
  } catch (error) {
    console.log(error)
  }
  }
}

export const getDetails = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/videogame/${id}`)
      return dispatch({
        type: GET_DETAILS,
        payload: response.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

