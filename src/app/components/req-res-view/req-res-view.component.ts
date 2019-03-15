import { Component, OnInit } from '@angular/core';
import { ReqResOperationService } from '@services/req-res-operation.service';

@Component({
  selector: 'app-req-res-view',
  templateUrl: './req-res-view.component.html',
  styleUrls: ['./req-res-view.component.scss']
})
export class ReqResViewComponent implements OnInit {

  private reqResData: any;
  constructor(
    private _reqRes: ReqResOperationService
  ) { 
    this._reqRes.reqResPutPost$.subscribe(res => {
      if(res) {
        this.reqResData = res;
      }
    }, err => {})
  }

  ngOnInit() {
  }

}
