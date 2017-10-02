import { DataService } from './data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuService extends DataService {

  constructor(http: Http) {
    super('assets/stubs/menuitems.json', http);
  }
}