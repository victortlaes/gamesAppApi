import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()

let searchedData = [];

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

export async function postGame(req, res) {
  try {
    const authUrl = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;
    const authResponse = await axios.post(authUrl);
    const token = authResponse.data.access_token;
    const igdbUrl = "https://api.igdb.com/v4/games";

    const { search } = req.body;

    const params = {
      fields: "name, genres.name, cover.*",
      search: search,
      limit: 100,
    }

    if (!search) {
      delete params.search
    }

    const igdbResponse = await axios.get(igdbUrl, {
      params,
      headers: {
        'Client-ID': clientId,
        'Authorization': `Bearer ${token}`,
      },
    });

    res.json(igdbResponse.data);
  } catch (error) {
    res.status(500).send('Erro interno do servidor');
  }
}

export async function getGame (req, res) {
  
  const authUrl = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;
  const authResponse = await axios.post(authUrl);
  const token = authResponse.data.access_token;
  const igdbUrl = "https://api.igdb.com/v4/games";
  
  const params = {
    fields: "name, genres.name, cover.*",
    limit: 100,
  }
  
  const igdbResponse = await axios.get(igdbUrl, {
    params,
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${token}`,
    },
  });

  searchedData = igdbResponse.data;
  res.json(searchedData);
}
