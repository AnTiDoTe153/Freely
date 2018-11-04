import { Injectable } from '@angular/core';
import { RequestProvider } from '../request/request';

/*
  Generated class for the RegisterCompanyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegisterCompanyProvider {

  constructor(private requestProvider: RequestProvider) {
    console.log('Hello RegisterCompanyProvider Provider');
  }
  registerCompany(email: string, password: string, name: string, description: string ): Promise<any>{
    var payload ={
      email: email,
      password: password,
      name: name,
      description: description
    }
    return this.requestProvider.buildPost("registerOrganisation", payload, false).map(data => data.json()).toPromise();
  }

}
