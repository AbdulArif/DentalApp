import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from "jspdf";
import "jspdf/dist/polyfills.es.js";


@Component({
  selector: 'app-global-login',
  templateUrl: './global-login.component.html',
  styleUrls: ['./global-login.component.scss']
})
export class GlobalLoginComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}
