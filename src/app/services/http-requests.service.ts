import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  constructor(
    private _http: HttpClient
  ) { }

  public callHttpMethod(method, url, body) {
    return this._http[method](url, body);
  }
}
