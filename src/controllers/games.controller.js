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

export async function getGenres(req, res) {
  try {
    const authUrl = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;
    const authResponse = await axios.post(authUrl);
    const token = authResponse.data.access_token;

    const igdbUrl = "https://api.igdb.com/v4/genres";
    const igdbResponse = await axios.get(igdbUrl, {
      params: {
        fields: "name",
        limit: 100,
      },
      headers: {
        'Client-ID': clientId,
        'Authorization': `Bearer ${token}`,
      },
    });

    const genres = igdbResponse.data.map(genre => genre.name);
    const uniqueGenres = [...new Set(genres)];

    res.json(uniqueGenres);
  } catch (error) {
    console.error('Erro na obtenção dos gêneros:', error);
    res.status(500).send('Erro interno do servidor');
  }
};

export async function getPlatforms(req, res) {
  try {
    const authUrl = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;
    const authResponse = await axios.post(authUrl);
    const token = authResponse.data.access_token;

    const igdbUrl = "https://api.igdb.com/v4/platforms";
    const igdbResponse = await axios.get(igdbUrl, {
      params: {
        fields: "*",
        sort: "generation desc",
        limit: 100,
      },
      headers: {
        'Client-ID': clientId,
        'Authorization': `Bearer ${token}`,
      },
    });

    const platforms = igdbResponse.data.map(platform => platform.name);
    const uniquePlatforms = [...new Set(platforms)];

    res.json(uniquePlatforms);
  } catch (error) {
    console.error('Erro na obtenção das plataformas:', error);
    res.status(500).send('Erro interno do servidor');
  }
};


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
