import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessResponseInterceptor<T> implements NestInterceptor<T> {
  constructor(
    private readonly statusCode: number,
    private readonly message: string,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: this.statusCode,
        message: this.message,
        data,
      })),
    );
  }
}
