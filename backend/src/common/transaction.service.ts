import { Injectable, Scope } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { ClientSession } from "mongodb";
import * as mongoose from 'mongoose';


// @Injectable()
@Injectable({ scope: Scope.REQUEST })
export class TransactionService {
    _session: ClientSession;

    constructor(@InjectConnection() private readonly connection: mongoose.Connection) {
        console.log("TransactionService constructor()");
    }

    async initSession() {

        this._session = await this.connection.startSession();
        console.log("TransactionService - initSession() - initiated");
        // console.log("TransactionService - initSession(), session: ", this._session);
        return this._session;
    }

    getSession(): ClientSession {
        return this._session;
    }
}