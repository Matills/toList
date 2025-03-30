const axios = require("axios");

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

class TMDbService {
  static async searchMoviesAndSeries(query) {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
        params: {
          query,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Error al buscar en TMDb:", error.response?.data || error.message);
      throw new Error("No se pudo obtener información de TMDb.");
    }
  }

  static async getDetails(type, id) {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/${type}/${id}`, {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener detalles de TMDb:", error.response?.data || error.message);
      throw new Error("No se pudo obtener detalles de TMDb.");
    }
  }
}

module.exports = TMDbService;