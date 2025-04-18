require('dotenv').config();
const express = require('express');
const routes = require('./src/routes/index');

const app = express();

app.use(express.json());
app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});