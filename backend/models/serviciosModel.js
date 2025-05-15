const db = require('../db/connection');

const obtenerServicioPorNombre = (nombre, callback) => {
  db.query('SELECT id FROM services WHERE name = ?', [nombre], callback);
};

module.exports = { obtenerServicioPorNombre };