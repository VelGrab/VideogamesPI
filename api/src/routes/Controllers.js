require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");

const getAllGenres = async () => {
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    genresApi.data.results.map((e) => {
      Genre.findOrCreate({
        where: {
          name: e.name,
        },
      });
    })
    const genresDb = await Genre.findAll();
    return genresDb;
}

module.exports = {
    getAllGenres
}