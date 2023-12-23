import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import gameRoute from './src/routes/games.route.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5700;

app.use(bodyParser.json());
app.use(cors());

app.use(gameRoute)

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
