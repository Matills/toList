const axios = require("axios");

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

class TMDbService {
  static async searchMoviesAndSeries(query) {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
        params: {
          api_key: TMDB_API_KEY,
          query,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Error al buscar en TMDb:", error.message);
      throw new Error("No se pudo obtener información de TMDb.");
    }
  }

  static async getDetails(type, id) {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/${type}/${id}`, {
        params: {
          api_key: TMDB_API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener detalles de TMDb:", error.message);
      throw new Error("No se pudo obtener detalles de TMDb.");
    }
  }
}

module.exports = TMDbService;