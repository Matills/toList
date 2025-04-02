const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    
    if (err.code === '23505') { 
      return res.status(409).json({ error: 'Registro duplicado' });
    }
    
    res.status(err.statusCode || 500).json({
      error: err.message || 'Error interno del servidor'
    });
};
  
module.exports = errorHandler;