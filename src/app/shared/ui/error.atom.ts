import { Component, input } from '@angular/core';

@Component({
  selector: 'lab-error',
  template: `<input
    type="text"
    disabled
    aria-invalid="true"
    style="width: 50%"
    [value]="error()"
  />`,
})
export class ErrorAtom {
  public readonly error = input<string>();
}
