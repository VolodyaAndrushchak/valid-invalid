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

  public callHttpMethod(method, url, body, query) {
    const startData = new Date();
    return this._http[method](url, body).pipe(map((res) => {
      return {
        res, 
        body, 
        query, 
        latency: (new Date().getTime() - startData.getTime())/1000 
      }
    }), catchError(e => of({
      res: e.error, 
      body, 
      query, 
      latency: (new Date().getTime() - startData.getTime())/1000
    })));
  }

  public serialize(obj) {
    let str = [];
    for (let p in obj)
      if (obj.hasOwnProperty(p)) {
        const value = obj[p];
        if(obj[p] instanceof Array || obj[p] instanceof Object){
          str.push(encodeURIComponent(p) + "=" + JSON.stringify(obj[p]));
        } else {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(value));
        }
      }
    return str.join("&");
  }



}
