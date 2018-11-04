import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { RegisterPage } from '../pages/register/register';
import { EventsPage } from '../pages/events/events';
import { OrganizationDetailsPage } from '../pages/organization-details/organization-details';
import { EventsDashBoardPage } from '../pages/events-dash-board/events-dash-board';
import { EventManagementPage } from '../pages/event-management/event-management';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(private alertController: AlertController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: UserDetailsPage },
      { title: 'Organization', component: OrganizationDetailsPage },
      { title: 'Events', component: EventsPage },
      { title: 'Dashboard', component: EventsDashBoardPage }
    ];

  }

  enableSwipe(){
    let view = this.nav.getActive();
    let name = "";
    if (view) {
      name = view.component.name;
    }
    if ( name == "LoginPage" || name == 'RegisterPage')
      return false;
    return true;
  }

  enableMenuOption(p){
    if(p.title == 'Organization'){
      if(sessionStorage.getItem("type") == "volunteer"){
        return false;
      }
    }
    if(p.title == 'Profile'){
      if(sessionStorage.getItem("type") != "volunteer"){
        return false;
      }
    }
    if(p.title == 'Dashboard'){
      if(sessionStorage.getItem("type") != "volunteer"){
        return false;
      }
    }

    if(p.title == 'Events'){
      if(sessionStorage.getItem("type") == "volunteer"){
        return false;
      }
    }


    return true;
    
  }

  logout(){
    var alert = this.alertController.create();
    alert.setTitle("Log out");
    alert.setMessage("Are you sure you want to log out?");
    alert.addButton({text: "Yes", handler: () =>{
      this.nav.setRoot(LoginPage);
    }});
    alert.addButton("No");
    alert.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
