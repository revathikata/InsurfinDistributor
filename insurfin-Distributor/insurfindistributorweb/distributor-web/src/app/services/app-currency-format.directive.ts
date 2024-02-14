import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCurrencyFormat]'
})
export class AppCurrencyFormatDirective {

  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    // Remove all characters except numbers and decimal point
    let value = event.target.value.replace(/[^0-9\.]/g, '');

    // Split the value into whole number and decimal parts
    let [whole, decimal] = value.split('.');

    // Add comma separators to the whole number part
    whole = whole.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');

    //     $(this).replace(/\B(?=(?:\d{3})+(?!\d))/g, ','); 
    // /*For US number system (millions & billions)*/

    // $(this).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
    // /*For Indian number system (lakhs & crores)*/

    // Combine the whole number and decimal parts
    if (decimal) {
      value = whole + '.' + decimal;
    } else {
      value = whole;
    }

    // Set the formatted value back into the input element
    this.control.control?.setValue(value);
  }
}