import { postGame, getGame, getGenres, getPlatforms } from '../controllers/games.controller.js'
import { Router } from 'express'

const route = Router();

route.post('/games', postGame);
route.get('/games', getGame);
route.get('/genres', getGenres);
route.get('/platforms', getPlatforms);

export default route;