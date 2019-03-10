import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {of} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  constructor(
    private _http: HttpClient
  ) { }

  public callHttpMethod(method, url, body) {
    return this._http[method](url, body).pipe(map((res) => {return {res, body}}), catchError(e => of({res: e.error, body})));
  }
}
