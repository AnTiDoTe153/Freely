import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private account: any = {
    username: "",
    password: ""
  };
  private rememberPass: boolean = true;
  private isLoading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  passIcon() {
    if (this.rememberPass) {
      return "checkbox";
    }
    return "square";
  }

  doLogin(){

  }

  togglePass(){
    
  }

  movetoregisterpage(){
    this.navCtrl.setRoot(RegisterPage);
  }

}
