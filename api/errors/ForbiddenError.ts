import {HTTPError} from './HTTPError'

export class ForbiddenError extends HTTPError {
    constructor(msg: string) {
        super(403, msg);
    }
}
