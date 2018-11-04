
import { Injectable } from '@angular/core';
import { RequestProvider } from '../request/request';

/*
  Generated class for the EventsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventsProvider {

  constructor(private requestProvider: RequestProvider) {
    console.log('Hello EventsProvider Provider');
  }

  createEvent(name: string, date: string, organization: string, description: string, category: string){
    var payload ={
      name: name,
      date: date,
      organisation: organization,
      description: description,
      category: category
    }
    return this.requestProvider.buildPost("createEvent", payload, false).map(data => data.json()).toPromise();
  
  }

  getEvents(){
    return this.requestProvider.buildGet("getEvents").map(data => data.json()).toPromise();
  }

}
