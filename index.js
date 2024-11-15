const express = require('express');
const cors = require('cors');
const { getAllGames, getGameById } = require('./controllers');

const app = express();
app.use(express.json());

//1
app.get('/games', async (req, res) => {
  const games = await getAllGames();
  res.json({ games });
});

//2
app.get('/games/details/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const game = await getGameById(id);
  res.json(game);
});

module.exports = { app };
