import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareSideMenuService {

  private mainMenusSource = new BehaviorSubject<any>([]);
  private subMenusSource = new BehaviorSubject<any>([]);
  mainMenus = this.mainMenusSource.asObservable()
  subMenus = this.subMenusSource.asObservable()

  constructor() { }

  setMainMenus(mainMenus: string[]) {
    this.mainMenusSource.next(mainMenus)
  }
  setSubMenus(subMenus: string[]) {
    this.subMenusSource.next(subMenus)
  }
}
