/* tslint:disable */

import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
//import { Storage } from '@ionic/storage';
/**
 * Generated class for the Popover component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class Popover {
  // private isToggled: boolean = true;
  toggleStatus: any;

  constructor(public viewCtrl: ViewController) {
    this.toggleStatus = localStorage.getItem('toggleStatus');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  notify(event: any) {
    localStorage.setItem('toggleStatus', event.checked);
  }
}
