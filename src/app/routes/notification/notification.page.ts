import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Resource,
  ResourceLoaderParams,
  ResourceStatus,
  Signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  NotificationDto,
  NullNotificationDto,
} from '../../shared/models/notification.dto';
import { ErrorAtom } from '../../shared/ui/error.atom';
import { LoadingAtom } from '../../shared/ui/loading.atom';
import { NotificationDetailComponent } from './notification-detail.component';
import { NotificationService } from './notification.service';

/**
 * Notification page component
 * - Routed to /notification/:id
 * - Displays the notification detail
 * @requires NotificationService to get the notification detail
 * @requires NotificationDetailComponent to display the notification detail
 * @requires LoadingAtom to display the loading
 * @requires ErrorAtom to display the error
 */
@Component({
  selector: 'lab-notification',
  imports: [NotificationDetailComponent, LoadingAtom, ErrorAtom],
  template: `
    @switch (status()) { @case ('Loading') {
    <lab-loading /> } @case ('Error') { <lab-error [error]="error()" /> } @case
    ('Resolved') {
    <lab-notification-detail [notification]="notificationValue()" /> } }
  `,
})
export default class NotificationPage {
  /**
   * Notification id input signal
   * - received from the `router`
   */
  public readonly id: InputSignal<string | undefined> = input<string>();

  private readonly notificationService: NotificationService =
    inject(NotificationService);

  private readonly notificationResource: Resource<NotificationDto> = rxResource(
    {
      request: () => ({ id: this.id() || '' }),
      loader: (params: ResourceLoaderParams<{ id: string }>) =>
        this.notificationService.getNotificationById(params.request.id),
    }
  );

  /**
   * Status of the notification resource
   * - Casted to a string to be used in the template
   */
  protected readonly status: Signal<string> = computed(
    () => ResourceStatus[this.notificationResource.status()]
  );
  /**
   * Error of the notification resource
   * - Casted to a string to be used in the template
   */
  protected readonly error: Signal<string> = computed(() => {
    const error = this.notificationResource.error();
    return error ? (error as HttpErrorResponse).message : JSON.stringify(error);
  });
  /**
   * Value of the notification resource
   * - Defaults to undefined
   */
  protected readonly notificationValue: Signal<NotificationDto> = computed(
    () => this.notificationResource.value() || NullNotificationDto
  );
}
