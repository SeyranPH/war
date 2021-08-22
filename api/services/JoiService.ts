import Joi from 'joi';

import { UnprocessableEntityError } from '../errors/UnprocessableEntityError';
import {ArmyInterface} from '../../models/Army'

export default {
    postGame: function (inputs: {firstArmy: ArmyInterface, secondArmy: ArmyInterface}){
        const baseSchema = Joi.object({
            amount: Joi.number().integer().min(0).required(),
            attack: Joi.number().integer().min(0).required(),
            health: Joi.number().integer().min(0).required(),
        })

        const armySchema = {
            soldier: baseSchema,
            tank: baseSchema,
            gun: baseSchema
        }
    
        const schema = Joi.object({
            firstArmy: armySchema,
            secondArmy: armySchema
        });
        if(schema.validate(inputs).error) {
            throw new UnprocessableEntityError('wrong input')
        }
        return;
    },
    postGameExecution: function (inputs: any){
        const schema = Joi.object({
            id: Joi.string().alphanum().required()
        })
        if(schema.validate(inputs).error) {
            throw new UnprocessableEntityError('wrong game id')
        }
        return;
    }
}