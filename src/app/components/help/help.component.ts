import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  private properties: any;
  constructor() {
    this.properties = environment.wrongPropValue;
    this.properties[1] = "undefined(as object)";
    this.properties = JSON.stringify(this.properties);
  }

  ngOnInit() {
  }

}
