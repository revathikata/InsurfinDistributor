import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAadhaarFormat]'
})
export class AadhaarFormatDirective {
  constructor(private el: ElementRef) { }


  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\s/g, '').replace(/\D/g, '');
    const formattedValue = this.formatAadhaarNumber(value);
    const selectionStart = this.calculateCursorPosition(input.selectionStart, input.value, formattedValue);
    const selectionEnd = this.calculateCursorPosition(input.selectionEnd, input.value, formattedValue);
    input.value = formattedValue;
    this.setCaretPosition(input, selectionStart, selectionEnd);
  }

  private formatAadhaarNumber(value: string): string {
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formattedValue.trim().substr(0, 14);
  }

  private calculateCursorPosition(cursorPosition: number | null, previousValue: string, formattedValue: string): number | null {
    if (cursorPosition === null) {
      return null;
    }

    const inputWithoutSpaces = previousValue.replace(/\s/g, '');
    const newValue = formattedValue.replace(/\s/g, '');

    const cursorOffset = Math.floor(cursorPosition / 5);
    const newPosition = cursorPosition + (newValue.length - inputWithoutSpaces.length) + cursorOffset;

    return newPosition;
  }

  private setCaretPosition(input: HTMLInputElement, selectionStart: number | null, selectionEnd: number | null) {
    if (selectionStart === null || selectionEnd === null) {
      return;
    }

    input.setSelectionRange(selectionStart, selectionEnd);
  }

}
