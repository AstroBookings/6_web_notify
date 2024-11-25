import { Component, input, InputSignal } from '@angular/core';

/**
 * Error atom component
 * - Displays the error message
 */
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
  /**
   * Error message input signal
   * - Required to avoid null errors in the template
   */
  public readonly error: InputSignal<string> = input.required<string>();
}
