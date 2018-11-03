import { Component } from '@angular/core';
import { ViewController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the CreateEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {

  private isLoading: boolean = false;

  private event: any = {
    name: "",
    date: "",
    description: "",
    category: "Music"
  }

  constructor(private alertController: AlertController, private eventsProvider: EventsProvider, private viewController: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

  showErrorAlert(message: string){
    var alert = this.alertController.create();
    alert.setTitle("Error");
    alert.setMessage(message);
    alert.addButton("Ok");

    alert.present();
  }

  createEvent(){
    this.eventsProvider.createEvent(this.event.name, this.event.date, sessionStorage.getItem("name"), this.event.description, this.event.category).then(data =>{
      if(data.status == "OK"){
        this.dismiss();
      }else{
        this.showErrorAlert("A aparut o eroare!");
      }
    });
  }

  dismiss() {
    this.viewController.dismiss();
  }

}
