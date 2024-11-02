import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {
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
