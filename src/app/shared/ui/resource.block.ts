import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
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

/**
 * Resource block component
 * - Displays a resource based on the provided templates
 * @requires resource - Resource to be displayed
 * @optional dataTemplate - Template to be used to display the resource value
 * @optional errorTemplate - Template to be used to display the resource error
 * @optional loadingTemplate - Template to be used to display the resource loading state
 * @optional noDataTemplate - Template to be used to display the resource no data state
 */
@Component({
  selector: 'lab-resource',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErrorAtom, LoadingAtom, NgTemplateOutlet, JsonPipe],
  template: `
   @switch (status()) {
      @case ('Loading') {
        @if (loadingTemplate()) {
          <ng-container *ngTemplateOutlet="loadingTemplate()!" />
        } @else {
          <lab-loading />
        }
      }
      @case ('Error') {
        @if (errorTemplate()) {
          <ng-container *ngTemplateOutlet="errorTemplate()!; context: { $implicit: error() }" />
        } @else {
          <lab-error [error]="error()" />
        }
      }
      @case ('Resolved') {
        @if (resource().hasValue()) {
          @if (dataTemplate()) {
            <ng-container *ngTemplateOutlet="dataTemplate()!; context: { $implicit: value() }" />
          } @else {
            <pre>{{ value() | json }}</pre>
          }
        } @else {
          @if (noDataTemplate()) {
            <ng-container *ngTemplateOutlet="noDataTemplate()!" />
          } @else {
            <span>🚫 No data yet</span>
          }
        }
      }
    }
  `,
})
export class ResourceBlock {
  /**
   * Resource to be displayed
   * - Required
   */
  public readonly resource = input.required<Resource<unknown>>();

  /**
   * Template to be used to display the resource value
   * - Optional, defaults to a JSON pipe
   */
  public readonly dataTemplate = input<TemplateRef<any>>();

  /** 
   * Template to be used to display the resource error
   * - Optional, defaults to a message 
   */
  public readonly errorTemplate = input<TemplateRef<any>>();

  /**
   * Template to be used to display the resource loading state
   * - Optional, defaults to a loading indicator
   */
  public readonly loadingTemplate = input<TemplateRef<any>>();

  /**
   * Template to be used to display the resource no data state
   * - Optional, defaults to a message
   */
  public readonly noDataTemplate = input<TemplateRef<any>>();

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
