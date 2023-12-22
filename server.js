const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser'); 

const app = express();
const port = 3005;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Servidor está rodando.');
});

app.get('/games', async (req, res) => {
  try {
    const clientId = "ilt59r1k367kepww23p20rn90n0npb";
    const clientSecret = "hj0z6g2ze8o9q1zg6d2818y1vq5p50";

    // Obtém o token de acesso
    const authUrl = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;
    const authResponse = await axios.post(authUrl);
    const token = authResponse.data.access_token;

    // Faz a solicitação à API IGDB com o token de acesso
    const igdbUrl = "https://api.igdb.com/v4/games?limit=100";
    const igdbResponse = await axios.get(igdbUrl, {
      params: {
      fields:"name, genres.name, cover.url",
      limit:100,
      }, 
      headers: {
        'Client-ID': clientId,
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log (igdbResponse.data);

    res.json(igdbResponse.data);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
