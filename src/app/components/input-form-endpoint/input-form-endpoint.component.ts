import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpRequestsService } from '../../services/http-requests.service';
import { environment } from '../../../environments/environment';
import { Method } from '../../interfaces/method.interface';

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
    private _http: HttpRequestsService
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
    this.testCases.push({body: JSON.parse(this.inputData.value.body.replace(/\r?\n|\r/g, ''))});
    this.testCases.push({body: {}});
    /*for (const property in originBody) {
      if (originBody.hasOwnProperty(property)) {
        for (let i = 0; i < this.otherValue.length; i++) {
          originBody[property] = this.otherValue[i];
          this.testCases.push({body: originBody});
        }
      }
      originBody = JSON.parse(this.inputData.value.body.replace(/\r?\n|\r/g, ''));
    }

    //add redundant properties
    originBody['extraProperty1'] = 'test value 1';
    this.testCases.push({body: originBody});
    originBody['extraProperty2'] = 'test value 2';
    this.testCases.push({body: originBody});

    console.log(this.testCases);*/

    this.testCases.map(({body}) => {
      this._http.callHttpMethod(this.inputData.value.method, this.inputData.value.url, body).subscribe(res => {
        console.log('res: ', res);
      }, err => {
        console.log('err: ', err);
      });
    }); 
  }

}
