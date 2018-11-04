import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {AlertController } from 'ionic-angular';
import {RegisterProvider} from '../../providers/register/register';
import {RegisterCompanyProvider} from '../../providers/register-company/register-company';
import { LoginProvider } from '../../providers/login/login';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private registerForm0: FormGroup;
  private registerForm1: FormGroup;
  private registerForm2: FormGroup;
  private registerForm3: FormGroup;
  @ViewChild(Slides) slides: Slides;
  constructor(private registerProvider2: RegisterCompanyProvider, private registerProvider: RegisterProvider, public alertController: AlertController, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    
    this.registerForm0 = this.formBuilder.group({
      account: [''],
    });

    this.registerForm1 = this.formBuilder.group({
     
      email: [''],
      password: [''],     
     
    });

    this.registerForm2 = this.formBuilder.group({
      name: [''],
      surname: [''],
      birthdate: [''],
      description: [''],   
    });
    this.registerForm3 = this.formBuilder.group({
      email: [''],
      password: [''],
      name: [''],
      description: [''],   
    });
  }


  private input: any = {
    account: ""
  };
  private volunteer: any = {
    name: "",
    surname: "",
    year: "",
    department: "",
    group: "",
    subgroup: "",
    email: "",
    phoneNumber: "",
    password: "",
    id: "",
    birthdate: "",
    description: ""
  };

  private company: any = {
    name: "",
    email: "",
    password: "",
    description: ""
  };



  
  goToNextSlide(){
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goToActualRegistration2(){
    if( this.volunteer.email == "" || this.volunteer.password == ""){
      this.showErrorAlert("You must fill in all fields");
    }
    else{
    this.goToNextSlide();
    }
  }

  goToActualRegistration(){
      this.goToNextSlide();
  }

  goToUniversitySlide(){
  
    if(this.volunteer.name == "" || this.volunteer.surname == "" || this.volunteer.birthdate == "" || this.volunteer.description == ""){
      this.showErrorAlert("You must fill in all fields");
    }
    else{
    this.goToNextSlide();
    }

    
  }

  showErrorAlert(errorMessage: string){
    var alert = this.alertController.create();
    alert.setTitle("Error");
    alert.setMessage(errorMessage);
    alert.addButton("Ok");
    alert.present();
  }
  doRegisterUser(){
    this.registerProvider.register(this.volunteer.email, this.volunteer.password, this.volunteer.name, this.volunteer.surname, this.volunteer.birthdate, this.volunteer.description).then(result =>{
      console.log(result);
      if(result.status == "OK"){
        this.navCtrl.setRoot(LoginPage);
      }else{
        this.showErrorAlert("Invalid login data!");
      }
    }); 
  }
  doRegisterCompany(){
    this.registerProvider2.registerCompany(this.company.email, this.company.password, this.company.name, this.company.description).then(result =>{
      console.log(result);
      if(result.status == "OK"){
        this.navCtrl.setRoot(LoginPage);
      }else{
        this.showErrorAlert("Invalid login data!");
      }
    }); 
  }
}
