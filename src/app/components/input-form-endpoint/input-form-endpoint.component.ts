import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { HttpRequestsService } from '@services/http-requests.service';
import { ReqResOperationService } from '@services/req-res-operation.service';
import { CommonService } from '@services/common.service';
import { environment } from '@environments/environment';
import { Method } from '@interfaces/method.interface';
import { TestCase } from '@interfaces/test-case.interface';
import * as _ from 'lodash'; 

@Component({
  selector: 'app-input-form-endpoint',
  templateUrl: './input-form-endpoint.component.html',
  styleUrls: ['./input-form-endpoint.component.scss']
})
export class InputFormEndpointComponent implements OnInit {

  public inputData: FormGroup;
  public testCases: Array<TestCase> = [];
  public otherValue = environment.wrongPropValue;
  private methods: Array<Method> = environment.methods;
  private promiseRequest: Array<Observable<null>> = [];
  private isJsonValid: boolean = true;
  private bodyOrQuery: string;
  constructor(
    private _http: HttpRequestsService,
    private _reqRes: ReqResOperationService,
    private _common: CommonService
  ) {
    this.inputData = new FormGroup(
      {
        url: new FormControl('', [
          Validators.required,
        ]),
        method: new FormControl('', [
          Validators.required
        ]),
        isMainDataOnly: new FormControl(false, [
          Validators.required
        ]),
        body: new FormControl('', []),
        queryParams: new FormControl('', [
        ])
      }
    );
  }

  ngOnInit() {}

private changeMethod() {
  const method = this.inputData.value.method;
  if (method === 'put' || method === 'post') {
    this.inputData.controls['body'].setValidators([Validators.required])
    this.inputData.controls['queryParams'].clearValidators();
    this.updateControls();
  } else {
    this.inputData.controls['queryParams'].setValidators([Validators.required])
    this.inputData.controls['body'].clearValidators();
    this.updateControls();
  }
}

  private updateControls() {
    this.inputData.controls['body'].updateValueAndValidity();
    this.inputData.controls['queryParams'].updateValueAndValidity();
  }

  private setInputData() {
    this.testCases = [];

    if (this.inputData.value.method === 'put' || this.inputData.value.method === 'post') {
      this.bodyOrQuery = 'body';
    } else {
      this.bodyOrQuery = 'queryParams';
    }

    this.bodyQueryValidation(this.inputData.value[this.bodyOrQuery]);
    let parsedBodyOrQuery = JSON.parse(this.inputData.value[this.bodyOrQuery].replace(/\r?\n|\r/g, ''));
    //add origin data
    let itemCase = {state: environment.HTTP_BODY_STATE.ORIGIN};
    itemCase[this.bodyOrQuery] = parsedBodyOrQuery;
    this.testCases.push(itemCase);

    if (!this.inputData.value.isMainDataOnly) {
      parsedBodyOrQuery = JSON.parse(this.inputData.value[this.bodyOrQuery].replace(/\r?\n|\r/g, ''));
      this.testCases = this.testDataGeneration(this.testCases, parsedBodyOrQuery, this.bodyOrQuery);
    }

    this.testCases.forEach((item, i) => {
      this.promiseRequest.push(this._http.callHttpMethod(
        this.inputData.value.method, 
        item.queryParams ? this.inputData.value.url + this._http.serialize(item.queryParams) : this.inputData.value.url,
        item.body ? item.body: undefined, 
        item.queryParams ? item.queryParams: undefined
        ));
    });

    forkJoin(this.promiseRequest).subscribe(res => {
      this._reqRes.reqResPutPostData = res;
    }, err => {}); 
  }

  private testDataGeneration(testCases, data, propertyName) {
    //empty data as test case
    let emptyBody = {state: environment.HTTP_BODY_STATE.GENERETED};
    emptyBody[propertyName] = {};
    testCases.push(emptyBody);

    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        this.otherValue.forEach(item => {
          data[property] = item;
          let testObj = {};
          testObj[propertyName] = _.cloneDeep(data);
          testCases.push(testObj);
        })
      }
      data = JSON.parse(this.inputData.value[propertyName].replace(/\r?\n|\r/g, ''));
    }

    //extra property as test case
    let exrtaObj = {};
    exrtaObj[propertyName] = 'test value 1';
    testCases.push(exrtaObj);

    return testCases;
  }

  private bodyQueryValidation(obj) {
    this.isJsonValid = true;
    this.isJsonValid = this._common.IsJsonString(obj);
    if (!this.isJsonValid) throw new Error('Invalid json');
  }
}
