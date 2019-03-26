import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HttpRequestsService } from '@services/http-requests.service';
import { ReqResOperationService } from '@services/req-res-operation.service';
import { CommonService } from '@services/common.service';
import { environment } from '@environments/environment';
import { Method } from '@interfaces/method.interface';
import * as _ from 'lodash'; 

@Component({
  selector: 'app-input-form-endpoint',
  templateUrl: './input-form-endpoint.component.html',
  styleUrls: ['./input-form-endpoint.component.scss']
})
export class InputFormEndpointComponent implements OnInit {

  public inputData: FormGroup;
  private methods: Array<Method> = environment.methods;
  private isJsonValid: boolean = true;
  private bodyOrQuery: string;
  private headers: FormArray;
  constructor(
    private _http: HttpRequestsService,
    private _reqRes: ReqResOperationService,
    private _common: CommonService,
    private formBuilder: FormBuilder
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
        body: new FormControl('{}', []),
        queryParams: new FormControl('{}', [
        ]),
        headers: this.formBuilder.array([])
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

  private createHeader() {
    return this.formBuilder.group({
      headerName: '',
      headerValue: ''
    });
  }

  private addHeader(): void {
    this.headers = this.inputData.get('headers') as FormArray;
    this.headers.push(this.createHeader());
  }

  private deleteHeader(i: number): void {
    const header = <FormArray>this.inputData.controls.headers;
    header.removeAt(i);
  }

  private setInputData() {
    if (this.inputData.value.method === 'put' || this.inputData.value.method === 'post') {
      this.bodyOrQuery = 'body';
    } else {
      this.bodyOrQuery = 'queryParams';
    }

    this.bodyQueryValidation(this.inputData.value[this.bodyOrQuery]);
    this._reqRes.testDataGeneration(
      this.inputData.value.headers,
      this.inputData.value.url,
      this.inputData.value.method,
      this.bodyOrQuery,
      this.inputData.value[this.bodyOrQuery],
      this.inputData.value.isMainDataOnly
    );
  }

  private bodyQueryValidation(obj) {
    this.isJsonValid = true;
    this.isJsonValid = this._common.IsJsonString(obj);
    if (!this.isJsonValid) throw new Error('Invalid json');
  }
}
