import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-developer-info',
  templateUrl: './developer-info.component.html',
  styleUrls: ['./developer-info.component.scss']
})
export class DeveloperInfoComponent implements OnInit {
  email: string = "abdularif.dgp@gmail.com"
  constructor() { }

  ngOnInit(): void {
  }

}
