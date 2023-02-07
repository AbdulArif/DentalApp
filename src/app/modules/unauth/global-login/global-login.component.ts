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
    //let pdf = new jsPDF()
    // var pdf = new jsPDF("p", "mm", "a4");
    var pdf = new jsPDF('l', 'mm', [297, 210]);


    // var width = pdf.internal.pageSize.getWidth();
    // var height = pdf.internal.pageSize.getHeight();
    // var imgData = 'data:image/jpeg;base64,/9j/4AAQSkZJ......';
    // pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
    // console.log(width + "........" + height)


    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("sample.pdf")
      }
    })
  }

}
