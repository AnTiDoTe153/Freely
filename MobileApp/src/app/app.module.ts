import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HttpModule} from '@angular/http';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { OrganizationDetailsPage } from '../pages/organization-details/organization-details';
import { EventsPage } from '../pages/events/events';
import { CreateEventPage } from '../pages/create-event/create-event';
import { EventManagementPage } from '../pages/event-management/event-management';
import { EventsDashBoardPage } from '../pages/events-dash-board/events-dash-board';

import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginProvider } from '../providers/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { RequestProvider } from '../providers/request/request';
import { RegisterProvider } from '../providers/register/register';
import { RegisterCompanyProvider } from '../providers/register-company/register-company';
import { EventsProvider } from '../providers/events/events';
import { EventOrganizationDescriptionPage } from '../pages/event-organization-description/event-organization-description';
import { EventParticipantsPage } from '../pages/event-participants/event-participants';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    UserDetailsPage,
    OrganizationDetailsPage,
    EventsPage,
    CreateEventPage,
    EventManagementPage,
    EventsDashBoardPage,
    EventOrganizationDescriptionPage,
    EventParticipantsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage, 
    RegisterPage,
    LoginPage,
    UserDetailsPage,
    OrganizationDetailsPage,
    EventsPage,
    CreateEventPage,
    EventManagementPage,
    EventsDashBoardPage,
    EventOrganizationDescriptionPage,
    EventParticipantsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    RequestProvider,
    EventsProvider,
    RegisterProvider,
    RegisterCompanyProvider
  ]
})
export class AppModule {}
