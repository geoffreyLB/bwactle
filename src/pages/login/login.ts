import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public login = {
    login: null, 
    password: null
  }

  constructor(public navCtrl: NavController) {
  }


  Login() {
    this.navCtrl.push("GamePage", {
      username: this.login.login, 
      password: this.login.password,
    })

  }
}
