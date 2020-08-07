import { async } from '@angular/core/testing';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
  catchError,
  delay,
  filter,
  map,
  retry,
  switchMap,
  take,
  tap,
  finalize,
} from 'rxjs/operators';

@Injectable()
export class HttpMainInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.addToken(
      request,
      '4b94ac33b867df53-e6789a995291f558-50eda386730e29bb'
    );

    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>, authToken: string) {
    return request.clone({
      setHeaders: {
        'X-Viber-Auth-Token': authToken
          ? authToken
          : btoa('HayasteneShatLavBanEJanDuduyDuduyDuduy'),
        'Access-Control-Allow-Origin': '*',
        Accept: '*/*',
      },
    });
  }
}
