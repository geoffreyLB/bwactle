import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import IO from 'socket.io-client';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

    // let username = 'toto';
    // let password = 'toto';
    // let apiUrl = 'wac.epitech.eu:1337';

    // let socket = IO(apiUrl, {query: `login=${username}&pwd=${password}`});

    // socket.on('player/add', function(player) {
    //   console.log(player)
    // }); 

  }

  toto() {
    this.navCtrl.push("LoginPage")
  }

}
