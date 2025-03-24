require('dotenv').config({ path: './src/.env' });
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});