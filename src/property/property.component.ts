import { Component, OnInit } from '@angular/core';
import { AppInterfaces } from '../shared/interfaces/app.interfaces';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  public jsonData = {
    'id': 1,
    'name': 'Security Instance',
    'recordCount': 425,
    'runDate': new Date(),
    'startTime': new Date(),
    'endTime': new Date()
  };
  public result: Array<AppInterfaces.IDictionary<string, any>> = [];

  public constructor() { }

  public ngOnInit(): void {
    for(let item in this.jsonData) {
      this.result.push(<AppInterfaces.IDictionary<string, any>>{
        key: item,
        value: this.jsonData[item]
      });
    }
  }

}
