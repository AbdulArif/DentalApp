import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FieldToggleService {

  fieldTextType!: boolean;

  constructor() { }

  toggleField() {
    this.fieldTextType = !this.fieldTextType;
  }
}
