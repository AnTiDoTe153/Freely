import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginProvider } from '../../providers/login/login';
import { AlertController } from 'ionic-angular';
import { UserDetailsPage } from '../../pages/user-details/user-details';
import { OrganizationDetailsPage} from '../../pages/organization-details/organization-details';

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
    email: "",
    password: ""
  };
  private rememberPass: boolean = false;
  private isLoading: boolean = false;

  constructor(private alertController: AlertController, private loginProvider: LoginProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   
    if(localStorage.getItem("rememberPass")=="true"){
    
      this.rememberPass=true;
    }else{
      this.rememberPass=false;
    }

    if(this.rememberPass){
      this.account.email=localStorage.getItem("email");
      this.account.password=localStorage.getItem("password");
    }

    
  }

  passIcon() {
    if (this.rememberPass) {
      return "checkbox";
    }
    return "square";
  }

  openRegisterPage(){
    this.navCtrl.setRoot(RegisterPage);
  }

  displayErrorAlert(message: string){
    var alert = this.alertController.create();
    alert.setTitle("Error");
    alert.setMessage(message);
    alert.addButton("Ok");
    alert.present();
  }

  doLogin(){
    this.loginProvider.login(this.account.email, this.account.password).then(result =>{
      console.log(result);
      if(result.status == "OK"){
        sessionStorage.setItem("type", result.type);
        if(result.type == "volunteer"){
          sessionStorage.setItem("firstName", result.data.firstName);
        }else{
          sessionStorage.setItem("name", result.data.name);
        }
        if(sessionStorage.getItem("type") == "volunteer"){
          this.navCtrl.setRoot(UserDetailsPage);
        }else{
          this.navCtrl.setRoot(OrganizationDetailsPage);
        }
        
      }else{
        this.displayErrorAlert("Invalid login data!");
      }
    });

    localStorage.setItem("rememberPass",this.rememberPass.toString()); 
    if(this.rememberPass){
      localStorage.setItem("email",this.account.email);
      localStorage.setItem("password",this.account.password);
      
    }
 
  }

  togglePass(){
    this.rememberPass =! this.rememberPass;
  }

  movetoregisterpage(){
    this.navCtrl.push(RegisterPage);
  }

}
