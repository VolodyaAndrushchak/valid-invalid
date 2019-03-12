import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { HttpRequestsService } from '../../services/http-requests.service';
import { ReqResOperationService } from '../../services/req-res-operation.service';
import { environment } from '../../../environments/environment';
import { Method } from '../../interfaces/method.interface';
import * as _ from 'lodash' ; 

@Component({
  selector: 'app-input-form-endpoint',
  templateUrl: './input-form-endpoint.component.html',
  styleUrls: ['./input-form-endpoint.component.scss']
})
export class InputFormEndpointComponent implements OnInit {

  public inputData: FormGroup;
  public testCases: Array<any> = [];
  public otherValue = environment.wrongPropValue;
  private methods: Array<Method> = environment.methods;
  private isJsonValid: boolean = true;
  constructor(
    private _http: HttpRequestsService,
    private _reqRes: ReqResOperationService
  ) {
    this.inputData = new FormGroup(
      {
        url: new FormControl('', [
          Validators.required,
        ]),
        method: new FormControl('', [
          Validators.required
        ]),
        body: new FormControl('', []),
        queryParams: new FormControl('', [
        ])
      }
    );
  }

  ngOnInit() {
  }

   IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

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
    let promiseRequest = [];
    if (this.inputData.value.method === 'put' || this.inputData.value.method === 'post') {
      let originBody;
      this.isJsonValid = true;
      this.isJsonValid = this.IsJsonString(this.inputData.value.body);
      if (!this.isJsonValid) throw new Error('Invalid json');

      originBody = JSON.parse(this.inputData.value.body.replace(/\r?\n|\r/g, ''));

      this.testCases.push({body: originBody, state: environment.HTTP_BODY_STATE.ORIGIN});
      this.testCases.push({body: {}, state: environment.HTTP_BODY_STATE.GENERETED});

      for (const property in originBody) {
        if (originBody.hasOwnProperty(property)) {
          this.otherValue.forEach(item => {
            originBody[property] = item;
            this.testCases.push({body:  _.cloneDeep(originBody), state: environment.HTTP_BODY_STATE.GENERETED});
          })
        }
        originBody = JSON.parse(this.inputData.value.body.replace(/\r?\n|\r/g, ''));
      }

      //add redundant properties
      originBody['extraProperty1'] = 'test value 1';
      this.testCases.push({body: originBody});
      originBody['extraProperty2'] = 'test value 2';
      this.testCases.push({body: originBody});
      this.testCases.forEach(({body}, i) => {
        promiseRequest.push(this._http.callHttpMethod(this.inputData.value.method, this.inputData.value.url, body, undefined));
      });
    } else {
      let originQuery;
      originQuery = JSON.parse(this.inputData.value.queryParams.replace(/\r?\n|\r/g, ''));
      this.testCases.push({query: originQuery, state: environment.HTTP_BODY_STATE.ORIGIN});
      this.testCases.push({query: {}, state: environment.HTTP_BODY_STATE.GENERETED});

      for (const property in originQuery) {
        if (originQuery.hasOwnProperty(property)) {
          this.otherValue.forEach(item => {
            originQuery[property] = item;
            this.testCases.push({query:  _.cloneDeep(originQuery)});
          })
        }
        originQuery = JSON.parse(this.inputData.value.queryParams.replace(/\r?\n|\r/g, ''));
      }

      //add redundant properties
      originQuery['extraProperty1'] = 'test value 1';
      this.testCases.push({query: originQuery});
      originQuery['extraProperty2'] = 'test value 2';
      this.testCases.push({query: originQuery});

      this.testCases.forEach(({query}, i) => {
        promiseRequest.push(this._http.callHttpMethod(this.inputData.value.method, this.inputData.value.url + this.serialize(query), undefined, query));
      });
    }

    forkJoin(promiseRequest).subscribe(res => {
      this._reqRes.reqResPutPostData = res;
    }, err => {}); 
  }

  private serialize(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        var value = obj[p];
        if(obj[p] instanceof Array || obj[p] instanceof Object){
          str.push(encodeURIComponent(p) + "=" + JSON.stringify(obj[p]));
        } else {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(value));
        }
      }
    return str.join("&");
  }
  
}
