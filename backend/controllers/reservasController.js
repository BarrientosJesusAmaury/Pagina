const db = require('../db/connection');

const crearReserva = (req, res) => {
  const { name, email, service_name, card_number, exp_date, cvv } = req.body;

  console.log('Datos recibidos:', { name, email, service_name, card_number, exp_date, cvv });

  db.query('SELECT id FROM users WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error('Error buscando usuario:', err);
      return res.status(500).json({ error: 'Error al buscar el usuario', details: err });
    }

    const insertarReserva = (userId) => {
      db.query(
        'INSERT INTO payments (card_number, exp_date, cvv) VALUES (?, ?, ?)',
        [card_number, exp_date, cvv],
        (err, pagoResult) => {
          if (err) {
            console.error('Error registrando pago:', err);
            return res.status(500).json({ error: 'Error al registrar el pago', details: err });
          }

          const paymentId = pagoResult.insertId;

          db.query(
            'SELECT id FROM services WHERE name = ?',
            [service_name],
            (err, servicioResult) => {
              if (err) {
                console.error('Error buscando servicio:', err);
                return res.status(500).json({ error: 'Error al buscar el servicio', details: err });
              }
              if (servicioResult.length === 0) {
                console.error('Servicio no encontrado:', service_name);
                return res.status(400).json({ error: 'Servicio no encontrado' });
              }

              const serviceId = servicioResult[0].id;

              db.query(
                'INSERT INTO reservations (user_id, service_id, payment_id) VALUES (?, ?, ?)',
                [userId, serviceId, paymentId],
                (err, reservaResult) => {
                  if (err) {
                    console.error('Error guardando reserva:', err);
                    return res.status(500).json({ error: 'Error al guardar la reserva', details: err });
                  }

                  res.status(200).json({ message: '✅ Reserva registrada con éxito 🙌' });
                }
              );
            }
          );
        }
      );
    };

    if (result.length > 0) {
      insertarReserva(result[0].id);
    } else {
      db.query(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email],
        (err, nuevoUser) => {
          if (err) {
            console.error('Error creando usuario:', err);
            return res.status(500).json({ error: 'Error al crear el usuario', details: err });
          }

          insertarReserva(nuevoUser.insertId);
        }
      );
    }
  });
};

module.exports = { crearReserva };