import { postGame, getGame } from '../controllers/games.controller.js'
import { Router } from 'express'

const route = Router();

route.post('/games', postGame);
route.get('/games', getGame)

export default route;