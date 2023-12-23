const axios = require("axios");

const clientId = "ilt59r1k367kepww23p20rn90n0npb";
const clientSecret = "hj0z6g2ze8o9q1zg6d2818y1vq5p50";
const authUrl = "https://id.twitch.tv/oauth2/token";
const params = {
  client_id: clientId,
  client_secret: clientSecret,
  grant_type: "client_credentials",
};

axios.post(authUrl, null, { params })
  .then(response => {
    const token = response.data.access_token;
    console.log("Token de Acesso:", token);
  })
  .catch(error => {
    console.error('Erro ao obter token:', error);
  });
