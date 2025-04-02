const axios = require("axios");
const logger = require("../utils/logger");

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

class TMDbService {
  static async searchMoviesAndSeries(query) {
    try {
      logger.info(`Buscando en TMDB: "${query}"`);
      const response = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
        params: {
          query,
        },
      });
      logger.debug(`Búsqueda TMDB completada: ${response.data.results.length} resultados`);
      return response.data.results;
    } catch (error) {
      logger.error(`Error al buscar en TMDb: ${error.response?.data?.status_message || error.message}`);
      if (error.response?.status) {
        logger.error(`Código de estado TMDB: ${error.response.status}`);
      }
      throw new Error("No se pudo obtener información de TMDb.");
    }
  }

  static async getDetails(type, id) {
    try {
      let tmdbType = type;
      if (type === 'series' || type === 'anime') {
        tmdbType = 'tv';
      }
      
      logger.info(`Obteniendo detalles de TMDB para ${tmdbType}/${id}`);
      const response = await axios.get(`${TMDB_BASE_URL}/${tmdbType}/${id}`, {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        },
      });
      logger.debug(`Detalles de TMDB recuperados para ${tmdbType}/${id}`);
      return response.data;
    } catch (error) {
      logger.error(`Error al obtener detalles de TMDb para ${type}/${id}: ${error.response?.data?.status_message || error.message}`);
      if (error.response?.status) {
        logger.error(`Código de estado TMDB: ${error.response.status}`);
      }
      throw new Error("No se pudo obtener detalles de TMDb.");
    }
  }
}

module.exports = TMDbService;