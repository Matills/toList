const TMDbService = require("../services/tmdbService");
const logger = require("../utils/logger");

const searchItems = async (req, res, next) => {
  const { query } = req.query;

  try {
    logger.info(`Usuario realizando búsqueda: "${query}"`);
    const results = await TMDbService.searchMoviesAndSeries(query);
    logger.info(`Búsqueda completada, ${results.length} resultados encontrados`);
    res.status(200).json(results);
  } catch (error) {
    logger.error(`Error en búsqueda "${query}": ${error.message}`);
    next(error);
  }
};

const getItemDetails = async (req, res, next) => {
  const { id, type } = req.params;

  try {
    logger.info(`Usuario solicitando detalles para ${type}/${id}`);
    const details = await TMDbService.getDetails(type, id);
    logger.info(`Detalles recuperados para ${type}/${id}`);
    res.status(200).json(details);
  } catch (error) {
    logger.error(`Error al obtener detalles para ${type}/${id}: ${error.message}`);
    next(error);
  }
};

module.exports = { searchItems, getItemDetails };