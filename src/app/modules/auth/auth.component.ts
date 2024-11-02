import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SidebarService } from 'src/app/services/shared/sidebar.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    public sidebarService: SidebarService,
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
  }

}
