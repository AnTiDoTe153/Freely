import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginProvider } from '../../providers/login/login';

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
  private rememberPass: boolean = false;
  private isLoading: boolean = false;

  constructor(private loginProvider: LoginProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   
    if(localStorage.getItem("rememberPass")=="true"){
    
      this.rememberPass=true;
    }else{
      this.rememberPass=false;
    }

    if(this.rememberPass){
      this.account.username=localStorage.getItem("username");
      this.account.password=localStorage.getItem("password");
    }

    
  }

  passIcon() {
    if (this.rememberPass) {
      return "checkbox";
    }
    return "square";
  }

  doLogin(){
    this.loginProvider.login(this.account.username, this.account.password).then(result =>{
      console.log(result);
    });

    localStorage.setItem("rememberPass",this.rememberPass.toString()); 
    if(this.rememberPass){
      localStorage.setItem("username",this.account.username);
      localStorage.setItem("password",this.account.password);
      
    }
 
  }

  togglePass(){
    this.rememberPass =! this.rememberPass;
  }

  movetoregisterpage(){
    this.navCtrl.setRoot(RegisterPage);
  }

}
