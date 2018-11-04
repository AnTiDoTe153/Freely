import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventOrganizationDescriptionPage } from '../event-organization-description/event-organization-description';
import { EventParticipantsPage } from '../event-participants/event-participants';

/**
 * Generated class for the EventManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-event-management',
  templateUrl: 'event-management.html',
})
export class EventManagementPage {

  private event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = navParams.get("event");
    console.log(this.event);
  }

  tab1Root = EventOrganizationDescriptionPage;
  tab2Root = EventParticipantsPage;

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventManagementPage');
  }

}
