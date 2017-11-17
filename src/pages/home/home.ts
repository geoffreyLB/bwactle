import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController,private nativeAudio: NativeAudio) {
    this.nativeAudio.preloadSimple('menu', '../../assets/music/01-title-theme.mp3');
  }

  ionViewDidLoad() {
    this.nativeAudio.play('menu');;
  }

  toto() {
    this.navCtrl.push("LoginPage")
  }

}
