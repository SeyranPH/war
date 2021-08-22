import express from 'express'
const router = express.Router()

import {warRouter} from './controllers/WarController'

router.use('/', warRouter);

export default router