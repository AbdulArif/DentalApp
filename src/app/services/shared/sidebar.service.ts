import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  isSidebarHidden: boolean = false;

  constructor() { }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
