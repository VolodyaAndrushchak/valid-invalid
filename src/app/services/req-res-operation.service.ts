import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import * as _ from 'lodash'; 

import { environment } from '@environments/environment';
import { TestCase } from '@interfaces/test-case.interface';
import { HttpRequestsService } from '@services/http-requests.service';


@Injectable({
  providedIn: 'root'
})
export class ReqResOperationService {

  private reqResPutPost: any;
  private promiseRequest: Array<Observable<null>> = [];
  public reqResPutPost$ = new BehaviorSubject(this.reqResPutPost);
  public testCases: Array<TestCase> = [];
  public propValue = environment.wrongPropValue;
  constructor(
    private _http: HttpRequestsService,
  ) { }

  public get reqResPutPostData() {
    return this.reqResPutPost$.value;
  }

  public set reqResPutPostData(value: any) {
    this.reqResPutPost$.next([]);
    this.reqResPutPost$.next(value);
  }

  public testDataGeneration(headers, url, method, requestContentType, content, isMainDataOnly) {
    this.testCases = [];
    this.promiseRequest = [];
    let parsedBodyOrQuery = JSON.parse(content);

    //add origin data
    let itemCase = {state: environment.HTTP_BODY_STATE.ORIGIN};
    itemCase[requestContentType] = parsedBodyOrQuery;
    this.testCases.push(itemCase);

    if (!isMainDataOnly) {
      parsedBodyOrQuery = JSON.parse(content.replace(/\r?\n|\r/g, ''));
      this.testCases = this.caseGeneration(this.testCases, parsedBodyOrQuery, requestContentType, content);
    }

    this.testCases.forEach((item, i) => {
      this.promiseRequest.push(this._http.callHttpMethod(
        headers,
        method, 
        item.queryParams ? url + this._http.serialize(item.queryParams) : url,
        item.body ? item.body: undefined, 
        item.queryParams ? item.queryParams: undefined
        ));
    });

    forkJoin(this.promiseRequest).subscribe(res => {
      this.reqResPutPostData = res;
    }, err => {}); 
  }

  private caseGeneration(testCases, data, propertyName, content) {
    //empty data as test case
    let emptyBody = {state: environment.HTTP_BODY_STATE.GENERETED};
    emptyBody[propertyName] = {};
    testCases.push(emptyBody);

    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        this.propValue.forEach(item => {
          data[property] = item;
          let testObj = {};
          testObj[propertyName] = _.cloneDeep(data);
          testCases.push(testObj);
        })
      }
      data = JSON.parse(content);
    }

    //extra property as test case
    let exrtaObj = {};
    exrtaObj[propertyName] = 'test value 1';
    testCases.push(exrtaObj);
    return testCases;
  }
}
