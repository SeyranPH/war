import mongoose from 'mongoose';
import { ArmyInterface } from './Army';

export interface GameInterface {
    firstArmy: string | ArmyInterface,
    secondArmy: string | ArmyInterface,
    result: string | undefined
}

const GameSchema = new mongoose.Schema({
    firstArmy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Army',
        required: true
    },
    secondArmy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Army',
        required: true
    },
    result: {
        type: String,
        required: false
    }
}, {timestamps: true});

export const GameModel = mongoose.model('Game', GameSchema);
