// Mostrar campos de pago según método seleccionado
function togglePaymentFields() {
  const metodo = document.getElementById('metodo')?.value;

  document.getElementById('tarjetaFields').style.display = 'none';
  document.getElementById('transferenciaFields').style.display = 'none';
  document.getElementById('paypalFields').style.display = 'none';

  if (metodo === 'tarjeta') {
    document.getElementById('tarjetaFields').style.display = 'block';
  } else if (metodo === 'transferencia') {
    document.getElementById('transferenciaFields').style.display = 'block';
  } else if (metodo === 'paypal') {
    document.getElementById('paypalFields').style.display = 'block';
  }
}

// Evento al enviar formulario de reserva
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('reservationForm');

  if (!form) {
    console.error('⚠️ No se encontró el formulario con ID "reservationForm"');
    return;
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault(); // Evitar recarga

    console.log('📤 Enviando formulario...');

    const tarjetaNumero = document.getElementById('tarjetaNumero')?.value || '';
    const tarjetaCVV = document.getElementById('tarjetaCVV')?.value || '';
    const exp_date = document.getElementById('exp_date')?.value || '';
    const nombre = document.getElementById('nombre')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const servicio = document.getElementById('servicio')?.value || '';
    const metodo = document.getElementById('metodo')?.value || '';

    // Validar que la fecha de expiración no esté vacía
    if (metodo === 'tarjeta' && !exp_date) {
      return alert('Por favor, selecciona la fecha de expiración.');
    }

    // Validaciones básicas para método de pago
    if (metodo === 'tarjeta') {
      if (!/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(tarjetaNumero)) {
        return alert('Por favor, ingrese un número de tarjeta válido.');
      }

      if (!/^\d{3}$/.test(tarjetaCVV)) {
        return alert('El CVV debe tener 3 dígitos.');
      }
    }

    if (metodo === 'transferencia') {
      const cuentaBancaria = document.getElementById('cuentaBancaria')?.value || '';
      if (cuentaBancaria.trim() === '') {
        return alert('Por favor, ingrese el número de cuenta bancaria.');
      }
    }

    if (metodo === 'paypal') {
      const paypalEmail = document.getElementById('paypalEmail')?.value || '';
      if (!paypalEmail) {
        return alert('Por favor, ingrese su correo electrónico de PayPal.');
      }
    }

    // Preparar datos para enviar al backend
    const datos = {
      name: nombre,
      email: email,
      service_name: servicio,
      card_number: tarjetaNumero,
      exp_date: exp_date,
      cvv: tarjetaCVV,
    };

    try {
      const respuesta = await fetch('http://localhost:3000/reservar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json();
      if (respuesta.ok) {
        alert('✅ Reserva realizada con éxito');
        form.reset();
        togglePaymentFields();
      } else {
        alert('❌ Error al reservar: ' + (resultado.message || 'Error desconocido'));
      }
    } catch (error) {
      console.error(error);
      alert('❌ Ocurrió un error al conectar con el servidor.');
    }
  });
});
