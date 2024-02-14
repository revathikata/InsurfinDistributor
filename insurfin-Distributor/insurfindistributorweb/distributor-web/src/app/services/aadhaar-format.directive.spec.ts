import { ElementRef } from '@angular/core';
import { AadhaarFormatDirective } from './aadhaar-format.directive';

describe('AadhaarFormatDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = new ElementRef(null);
    const directive = new AadhaarFormatDirective(elementRefMock);
    expect(directive).toBeTruthy();
  });
});