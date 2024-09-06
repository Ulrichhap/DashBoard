const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());

// Endpoint pour servir les données
app.get('/', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Erreur lors de la lecture des données.');
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Serveur backend actif sur http://localhost:${PORT}`);
});
