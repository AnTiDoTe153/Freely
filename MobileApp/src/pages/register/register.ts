import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {AlertController } from 'ionic-angular';


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
  @ViewChild(Slides) slides: Slides;
  constructor(public alertController: AlertController, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    
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
    if(this.input.account == "Volunteer" ){
      this.goToNextSlide();
    }
    else if(this.input.account == "Company")
    {
      this.goToNextSlide();
      this.goToNextSlide();
    }
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
}
