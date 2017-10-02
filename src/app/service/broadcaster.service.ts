import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/filter';

@Injectable()
export class BroadcasterService {


  private _eventBus: Subject<{ key: any; data?: any; }>;

  constructor() {
    this._eventBus = new Subject<{ key: any; data?: any; }>();
  }

  broadcast(key: any, data?: any) {
      this._eventBus.next({key, data});
  }

  on<T>(key: any): Observable<T> {
      return this._eventBus.asObservable()
              .filter(event => event.key === key)
              .map(event => <T>event.data);
  }
}
