import { ArmyInterface, ArmyModel } from '../../models/Army'
import { GameModel } from '../../models/Game'
import mongoose from 'mongoose';
import { ForbiddenError } from '../errors/ForbiddenError'
import { NotFoundError } from '../errors/NotFoundError';
import { ConflictError } from '../errors/ConflictError';



export default {
    createGame: async function(firstArmyInput: ArmyInterface, secondArmyInput: ArmyInterface) {
        const firstArmy = new ArmyModel(firstArmyInput);
        await firstArmy.save();
        const secondArmy = new ArmyModel(secondArmyInput);
        await secondArmy.save();
        let game = new GameModel({firstArmy: firstArmy.id, secondArmy: secondArmy.id});
        await game.save();
        return game.id;
    },
    executeGame: async function(id: string) {
        const game = await GameModel.findById(id).populate('firstArmy').populate('secondArmy');
        if (!game) {
            throw new NotFoundError('Game not found');
        }
        if (game.result) {
            throw new ConflictError('Game has already been executed');
        }
        const result = findGameResult(game.firstArmy, game.secondArmy);
        game.result = result;
        await game.save();
        return result;
    },
    getGamesWithPagination: async function(limit: number, skip: number) {
        return await GameModel.find().sort('createdAt').limit(limit).skip(skip);
    }
}

function findGameResult(firstArmy: ArmyInterface, secondArmy: ArmyInterface) {
    const firstArmyStats = findStats(firstArmy);
    const secondArmyStats = findStats(secondArmy);

    if (firstArmyStats.armyAttack - secondArmyStats.armyHealth > secondArmyStats.armyAttack - firstArmyStats.armyHealth) {
        return 'first army won';
    }
    if (firstArmyStats.armyAttack - secondArmyStats.armyHealth < secondArmyStats.armyAttack - firstArmyStats.armyHealth) {
        return 'second army won';
    }
    return 'draw'
}


function findStats(army: ArmyInterface) {
    if (army.tank.health + army.tank.attack < (army.gun.health + army.gun.attack + army.soldier.health + army.soldier.attack)*4) {
        throw new ForbiddenError('tank stats are too low');
    }

    let armyHealth = 0, armyAttack = 0;

    let usableTanks = Math.min(army.soldier.amount/4, army.tank.amount);
    armyHealth += usableTanks * army.tank.health;
    armyAttack += usableTanks * army.tank.attack;
    army.soldier.amount -= usableTanks*4;

    let usableGuns = Math.min(army.soldier.amount, army.gun.amount);
    armyHealth += usableGuns * (army.gun.health + army.soldier.health);
    armyAttack += usableGuns * (army.gun.attack + army.soldier.attack);
    army.soldier.amount -= usableGuns;

    armyHealth += army.soldier.amount * army.soldier.health;
    armyAttack += army.soldier.amount * army.soldier.attack;

    return { armyHealth, armyAttack }
}

