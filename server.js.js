const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.get('/proyectos', (req, res) => {
  res.json([
    { id: 1, nombre: 'Proyecto 1' },
    { id: 2, nombre: 'Proyecto 2' }
  ]);
});

app.post('/proyectos', (req, res) => {
  const nuevoProyecto = req.body;
  res.status(201).json(nuevoProyecto);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
