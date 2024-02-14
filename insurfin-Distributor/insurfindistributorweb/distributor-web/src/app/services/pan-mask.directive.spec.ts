import { ElementRef } from '@angular/core';
import { PanMaskDirective } from './pan-mask.directive';

describe('PanMaskDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = new ElementRef(null);
    const directive = new PanMaskDirective(elementRefMock);
    expect(directive).toBeTruthy();
  });
});
