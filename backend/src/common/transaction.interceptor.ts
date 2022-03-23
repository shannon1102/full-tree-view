import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TransactionService } from './transaction.service';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly transactionService: TransactionService) {
    console.log("TransactionInterceptor constructor()");

  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    console.log('Before interceptor');
    var session = await this.transactionService.initSession();
    await session.startTransaction();
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(async () => {
          console.log(`After interceptor: ... ${Date.now() - now}ms`)
          // console.log("session before committing = ", session);
          await session.commitTransaction();
          await session.endSession();
        }
        ),
        catchError(err => throwError(async () => {
          console.log(`Error at interceptor, about to abort the transaction...${Date.now() - now}ms\nError: `, err);
          await session.abortTransaction();
          await session.endSession();
        }))
      );
  }
}