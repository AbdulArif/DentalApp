import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from "jspdf";
import "jspdf/dist/polyfills.es.js";


@Component({
  selector: 'app-global-login',
  templateUrl: './global-login.component.html',
  styleUrls: ['./global-login.component.scss']
})
export class GlobalLoginComponent implements OnInit {

  @ViewChild('parentdiv', { static: false }) el!: ElementRef

  constructor() { }

  ngOnInit(): void {
  }

  download() {
    let pdf = new jsPDF()
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("sample.pdf") 
      }
    })
  }

}
