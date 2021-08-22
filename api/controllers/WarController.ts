import express from 'express'
import { ArmyInterface } from '../../models/Army';
const warRouter = express.Router()
import WarService from '../services/WarService'
import JoiService from '../services/JoiService'

warRouter.get('/game',  async function (req: express.Request, res: express.Response, next: any) {
    try{
        const { limit, skip } = req.query;
        const result = await WarService.getGamesWithPagination(Number(limit), Number(skip));
        return res.status(200).send({result: result});
    }
    catch (error) {
        next(error, req, res, next);
    }
});

warRouter.post('/game', async function (req: express.Request, res: express.Response, next: any) {
    try{
        JoiService.postGame(req.body);
        const {firstArmy,secondArmy } = req.body;
        const gameId = await WarService.createGame(firstArmy, secondArmy);
        return res.status(201).send({message: 'game created', gameId: gameId});
    }
    catch (error) {
        next(error, req, res, next);
    }
});

warRouter.post('/game/start/:id', async function (req: express.Request, res: express.Response, next: any) {
    try{
        JoiService.postGameExecution(req.params);
        const { id } = req.params;
        const result = await WarService.executeGame(id);
        return res.status(200).send({message: 'game executed', result: result});
    }
    catch (error) {
        next(error, req, res, next);
    }
});

export {warRouter}