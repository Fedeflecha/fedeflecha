const QRCode = require('qrcode');

const url = 'exp://192.168.0.13:8081';

QRCode.toFile('expo_qr.png', url, {
  color: {
    dark: '#000',  // Color of the QR code
    light: '#FFF'  // Color of the background
  }
}, function (err) {
  if (err) throw err;
  console.log('Código QR generado y guardado como expo_qr.png');
});
