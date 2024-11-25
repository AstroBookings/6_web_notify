import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  computed,
  input,
  Resource,
  ResourceStatus,
  Signal,
  TemplateRef,
} from '@angular/core';
import { ErrorAtom } from './error.atom';
import { LoadingAtom } from './loading.atom';

@Component({
  selector: 'lab-resource',
  imports: [ErrorAtom, LoadingAtom, NgTemplateOutlet, JsonPipe],
  template: `
    @switch (status()) { @case ('Loading') {
    <lab-loading />
    } @case ('Error') {
    <lab-error [error]="error()" />
    } @case ('Resolved') { @if (value()) {
    <ng-container
      *ngTemplateOutlet="template() || default; context: { $implicit: value() }"
    />
    } @else {
    <p>No data yet</p>
    } } }

    <ng-template #default let-data>
      <pre>{{ data | json }}</pre>
    </ng-template>
  `,
})
export default class ResourceBlock {
  /**
   * Resource to be displayed
   * - Required
   */
  public readonly resource = input.required<Resource<unknown>>();

  /**
   * Template to be used to display the resource value
   * - Optional, defaults to a JSON pipe
   */
  public readonly template = input<TemplateRef<any>>();

  /**
   * Status of the notifications resource
   * - Casted to a string to be used in the template
   */
  protected readonly status: Signal<string> = computed(
    () => ResourceStatus[this.resource().status()]
  );
  /**
   * Error of the notifications resource
   * - Casted to a string to be used in the template
   */
  protected readonly error: Signal<string> = computed(() => {
    const error = this.resource().error();
    return error ? (error as HttpErrorResponse).message : JSON.stringify(error);
  });
  /**
   * Value of the notifications resource
   * - Defaults to undefined
   */
  protected readonly value: Signal<unknown> = computed(() =>
    this.resource().value()
  );
}
