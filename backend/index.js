const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const reservasRoutes = require('./routes/reservas');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// 👉 Aquí conectamos el frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas API
app.use('/reservar', reservasRoutes);

// 👉 Si alguien va a /, le mandamos Home.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/Home.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});
