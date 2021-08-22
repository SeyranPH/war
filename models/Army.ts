import mongoose from 'mongoose';

export interface ArmyInterface {
    soldier: {
        amount: number,
        attack: number,
        health: number
    },
    tank: {
        amount: number,
        attack: number,
        health: number
    },
    gun: {
        amount: number,
        attack: number,
        health: number
    }
}

const ArmySchema = new mongoose.Schema({
    soldier: {
        amount: {
            type: Number,
            required: true
        },
        health: {
            type: Number,
            required: true
        },
        attack: {
            type: Number,
            required: true
        }
    },
    gun: {
        amount: {
            type: Number,
            required: true
        },        
        health: {
            type: Number,
            required: true
        },
        attack: {
            type: Number,
            required: true
        }
    },
    tank: {
        amount: {
            type: Number,
            required: true
        },        
        health: {
            type: Number,
            required: true
        },
        attack: {
            type: Number,
            required: true
        }
    }
}, {timestamps: true});

export const ArmyModel = mongoose.model('Army', ArmySchema);
