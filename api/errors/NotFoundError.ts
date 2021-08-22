import {HTTPError} from './HTTPError'

export class NotFoundError extends HTTPError {
    constructor(msg: string) {
        super(404, msg);
    }
}