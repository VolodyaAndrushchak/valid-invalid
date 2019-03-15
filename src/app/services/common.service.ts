import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  public IsJsonString(str) {
    try {
     JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
}
}
