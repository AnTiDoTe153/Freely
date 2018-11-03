
import { Injectable } from '@angular/core';
import { RequestProvider } from '../request/request';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(private requestProvider: RequestProvider) {
    console.log('Hello LoginProvider Provider');
  }

  login(username: string, password: string): Promise<any>{
    var payload ={
      username: username,
      password: password
    }
    return this.requestProvider.buildPost("login", payload, false).toPromise();
  }

}
