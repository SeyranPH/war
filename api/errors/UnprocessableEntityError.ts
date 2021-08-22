import {HTTPError} from './HTTPError'

export class UnprocessableEntityError extends HTTPError {
    constructor(msg: string) {
        super(422, msg);
    }
}