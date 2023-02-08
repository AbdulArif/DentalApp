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


  downloadPdf() {
    const pdf = new jsPDF();
    var elementHTML = <HTMLElement>document.querySelector("#parentdiv");
    pdf.html(elementHTML, {
      callback: () => {
        var pageCount = pdf.internal.pages.length
        for (let i = pageCount; i >= 2; i--) {
          pdf.deletePage(i)
        }
        pdf.save("sample.pdf");
      },
      x: 0,
      y: 0,
      width: 210,
      windowWidth: elementHTML.offsetWidth
    })
  }

}
