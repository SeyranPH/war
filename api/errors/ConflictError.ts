import {HTTPError} from './HTTPError'

export class ConflictError extends HTTPError {
    constructor(msg: string) {
        super(409, msg);
    }
}
