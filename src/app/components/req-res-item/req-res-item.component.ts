import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-req-res-item',
  templateUrl: './req-res-item.component.html',
  styleUrls: ['./req-res-item.component.scss']
})
export class ReqResItemComponent implements OnInit {

  @Input() item: any;
  constructor() { }

  ngOnInit() {
  }
}
