import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private title: Title,

  ) { }

  ngOnInit(): void {
    this.title.setTitle("User")
  }

}
