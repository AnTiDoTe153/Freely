import { Injectable } from '@angular/core';
import { RequestProvider } from '../request/request';

/*
  Generated class for the RegisterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegisterProvider {

  constructor(private requestProvider: RequestProvider) {
    console.log('Hello RegisterProvider Provider');
  }
  register(email: string, password: string, name: string, surname: string, birthdate: Date, description: string ): Promise<any>{
    var payload ={
      email: email,
      password: password,
      lastname: name,
      firstname: surname,
      birthdate: birthdate,
      description: description
    }
    return this.requestProvider.buildPost("registerUser", payload, false).map(data => data.json()).toPromise();
  }

}
