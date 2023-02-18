import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  audioPath = "assets/audio/";
  public isMute: boolean = false;
  
  constructor() { }
  setAudioMuteStatus(_isMute: boolean) {
    if (_isMute) {
        localStorage.setItem("isMute", "true");
        this.isMute = true;
    }
    else {
        localStorage.setItem("isMute", "false");
        this.isMute = false;
    }
}

getAudioMuteStatus() {
    if (localStorage.getItem("isMute") == "true") {
        this.isMute = true;
    }
    else {
        this.isMute = false;
    }
}

playOrPause(audio: HTMLAudioElement) {
    if (!this.isMute) {
        audio.play();
    }
    else {
        audio.pause();
    }
}

// -----------------------------------------------  //

cameraShutter() {
    var audio = new Audio(this.audioPath + "camera-shutter-click.wav");
    this.playOrPause(audio);
}

buttonClick() {
    var audio = new Audio(this.audioPath + "3_click.mp3");
    this.playOrPause(audio);
}

success() {
    var audio = new Audio(this.audioPath + "1_success.mp3");
    this.playOrPause(audio);
}

error() {
    var audio = new Audio(this.audioPath + "2_error.mp3");
    this.playOrPause(audio);
}
}
