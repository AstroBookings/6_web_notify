import { Component } from '@angular/core';

/**
 * Loading atom component
 * - Displays the loading message
 */
@Component({
  selector: 'lab-loading',
  template: `<span aria-busy="true">Loading...</span>`,
})
export class LoadingAtom {}
