const TMDbService = require("../services/tmdbService");

const searchItems = async (req, res) => {
  const { query } = req.query;

  try {
    const results = await TMDbService.searchMoviesAndSeries(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItemDetails = async (req, res) => {
  const { id, type } = req.params;

  try {
    const details = await TMDbService.getDetails(type, id);
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { searchItems, getItemDetails };