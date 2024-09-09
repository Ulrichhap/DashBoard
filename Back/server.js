const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());

// Endpoint pour servir les données
app.get('/', (req, res) => {
  fs.readFile('./data/Project.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Erreur lors de la lecture des données.');
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint pour servir les données
app.get('/anime', (req, res) => {
  fs.readFile('./data/Anime.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Erreur lors de la lecture des données.');
    }
    res.json(JSON.parse(data));
  });
});

app.get('/hospital', (req, res) => {
  fs.readFile('./data/Hospital.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Erreur lors de la lecture des données.');
    }
    res.json(JSON.parse(data));
  });
});

app.get('/medication', (req, res) => {
  fs.readFile('./data/Medication.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Erreur lors de la lecture des données.');
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Serveur backend actif sur http://localhost:${PORT}`);
});
