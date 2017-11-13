import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import IO from 'socket.io-client';

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
 public socket;
  
  public login = {
    login: null, 
    password: null
  }

  constructor(public navCtrl: NavController) {
    
  }

  ionViewDidLoad() {
    // const data = this.navParams.get('data');
    // console.log('fiohfiqshfoisqfhqiosfhqoihfioshfoshfqois LoginPage');
  }

  Login() {
    // const username: string = this.login.login;
    // const password: string = this.login.password;
    // const apiUrl = 'wac.epitech.eu:1337';

    // socket = IO(apiUrl, {query: `login=${username}&pwd=${password}`});

    // socket.on('player/add', function(player) {
    //   console.log(player) 
    // }); 

    this.navCtrl.push("GamePage", {
      username: this.login.login, 
      password: this.login.password,
    })

  }
}
