import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowNavigatorService {

  constructor() { }

  get language() {
    return window.navigator.language;
  }
  get languages() {
    return window.navigator.languages;
  }
  // get connection() {
  //   return window.navigator.connection;
  // }
  get onLine() {
    return window.navigator.onLine;
  }
  get cookieEnabled() {
    return window.navigator.cookieEnabled;
  }
  get hardwareConcurrency() {
    // returns the number of logical processors available to run threads on the user's computer
    return window.navigator.hardwareConcurrency;
  }
  get userAgent() {
    return window.navigator.userAgent;
  }
  get maxTouchPoints() {
    // returns the maximum number of simultaneous touch contact points are supported by the current device
    return window.navigator.maxTouchPoints;
  }

  get enumerateDevices() {
    // use==> .then(devices => { }).catch(err => { err }); to get desired output
    return window.navigator.mediaDevices.enumerateDevices();
  }
  get getDisplayMedia() {
    // Prompts the user to select a display or portion of a display (such as a window) to capture as a MediaStream for sharing or recording purposes
    return window.navigator.mediaDevices.getDisplayMedia;
  }
  get getTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }


}
