import { Component, OnInit } from '@angular/core';
import { ReqResOperationService } from '@services/req-res-operation.service';

@Component({
  selector: 'app-title-test-data',
  templateUrl: './title-test-data.component.html',
  styleUrls: ['./title-test-data.component.scss']
})
export class TitleTestDataComponent implements OnInit {

  private isResponse: boolean = false;
  constructor(
    private _reqRes: ReqResOperationService
  ) {
    this._reqRes.reqResPutPost$.subscribe(res => {
      if(res) {
        this.isResponse = true;
      }
    }, err => {})
  }

  ngOnInit() {
  }

}
