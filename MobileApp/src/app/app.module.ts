import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HttpModule} from '@angular/http';


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { OrganizationDetailsPage } from '../pages/organization-details/organization-details';
import { EventsPage } from '../pages/events/events';
import { CreateEventPage } from '../pages/create-event/create-event';
import { EventManagementPage } from '../pages/event-management/event-management';

import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginProvider } from '../providers/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { RequestProvider } from '../providers/request/request';
import { EventsProvider } from '../providers/events/events';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    UserDetailsPage,
    OrganizationDetailsPage,
    EventsPage,
    CreateEventPage,
    EventManagementPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage, 
    RegisterPage,
    LoginPage,
    UserDetailsPage,
    OrganizationDetailsPage,
    EventsPage,
    CreateEventPage,
    EventManagementPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    RequestProvider,
    EventsProvider
  ]
})
export class AppModule {}
