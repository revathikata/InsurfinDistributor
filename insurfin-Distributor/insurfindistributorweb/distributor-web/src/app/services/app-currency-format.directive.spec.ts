import { DebugElement } from '@angular/core';
import { AppCurrencyFormatDirective } from './app-currency-format.directive';
import { NgControl } from '@angular/forms';

describe('AppCurrencyFormatDirective', () => {
  let inputEl: DebugElement;
  let inputControl:NgControl;
  it('should create an instance', () => {
    const directive = new AppCurrencyFormatDirective(inputEl, inputControl);
    expect(directive).toBeTruthy();
  });
});
