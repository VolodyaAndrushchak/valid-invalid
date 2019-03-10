import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReqResOperationService {

  private reqResPutPost: any;
  public reqResPutPost$ = new BehaviorSubject(this.reqResPutPost);
  constructor() { }

  public get reqResPutPostData() {
    return this.reqResPutPost$.value;
  }

  public set reqResPutPostData(value: any) {
    this.reqResPutPost$.next([]);
    this.reqResPutPost$.next(value);
  }
}
