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
  selector: 'app-resource',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, JsonPipe],
  template: ` 
    @switch (status()) { 
      @case ('Loading') {
        <ng-container *ngTemplateOutlet="loadingTemplate() || defaultLoadingTemplate" />
      } 
      @case ('Error') {
        <ng-container *ngTemplateOutlet="errorTemplate() || defaultErrorTemplate; context: { $implicit: error() }" />
      } 
      @case ('Resolved') { 
        @if (resource().hasValue()) {
          <ng-container *ngTemplateOutlet="dataTemplate() || defaultDataTemplate; context: { $implicit: value() }" />
        } @else {
          <ng-container *ngTemplateOutlet="noDataTemplate() || defaultNoDataTemplate" />
        }
      }
    }
    <ng-template #defaultLoadingTemplate>
      <span>⏳ Loading...</span>
    </ng-template>
    <ng-template #defaultErrorTemplate let-error>
      <span>❌ {{ error }}</span>
    </ng-template>
    <ng-template #defaultDataTemplate let-data>
      <pre>{{ data | json }}</pre>
    </ng-template>
    <ng-template #defaultNoDataTemplate>
      <span>🚫 No data yet</span>
    </ng-template>
  `,
})
export class ResourceComponent {
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
