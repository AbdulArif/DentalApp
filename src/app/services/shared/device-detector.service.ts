import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectService {

  deviceInfo: any;
  private ua = navigator.userAgent;


  constructor(private deviceService: DeviceDetectorService) { }

  deviceFullInfo() {
    return this.deviceService.getDeviceInfo();
  }

  isMobile() {
    return this.deviceService.isMobile();
  }

  isTablet() {
    return this.deviceService.isTablet();
  }

  isDesktopDevice() {
    return this.deviceService.isDesktop();
  }
  getDeviceType() {
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(this.ua)) { return "tablet"; }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(this.ua)) { return "mobile"; }
    return "desktop";
  }
}
