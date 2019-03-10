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
  constructor(
    private _http: HttpRequestsService,
    private _reqRes: ReqResOperationService
  ) {
    this.inputData = new FormGroup(
      {
        url: new FormControl('', [
          Validators.required
        ]),
        method: new FormControl('', [
          Validators.required
        ]),
        body: new FormControl('', [
          Validators.required
        ]),
      }
    );
  }

  ngOnInit() {
  }

  private setInputData() {
    let originBody = JSON.parse(this.inputData.value.body.replace(/\r?\n|\r/g, ''));
    this.testCases.push({body: originBody});
    this.testCases.push({body: {}});
    for (const property in originBody) {
      if (originBody.hasOwnProperty(property)) {
        this.otherValue.forEach(item => {
          originBody[property] = item;
          this.testCases.push({body:  _.cloneDeep(originBody)});
        })
      }
      originBody = JSON.parse(this.inputData.value.body.replace(/\r?\n|\r/g, ''));
    }

    //add redundant properties
    originBody['extraProperty1'] = 'test value 1';
    this.testCases.push({body: originBody});
    originBody['extraProperty2'] = 'test value 2';
    this.testCases.push({body: originBody});

    let promiseRequest = [];

    this.testCases.forEach(({body}, i) => {
      promiseRequest.push(this._http.callHttpMethod(this.inputData.value.method, this.inputData.value.url, body));
    })

    forkJoin(promiseRequest).subscribe(res => {
      this._reqRes.reqResPutPostData = res;
    }, err => {}); 
  }
}
