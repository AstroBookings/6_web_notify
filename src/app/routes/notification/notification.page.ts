import {
  Component,
  inject,
  input,
  InputSignal,
  Resource,
  ResourceLoaderParams,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NotificationDto } from '../../shared/models/notification.dto';
import { ResourceBlock } from '../../shared/ui/resource.block';
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
  imports: [NotificationDetailComponent, ResourceBlock],
  template: `
    <lab-resource [resource]="notificationResource" [dataTemplate]="notificationDetail">
      <ng-template #notificationDetail let-notification>
        <lab-notification-detail [notification]="notification" />
      </ng-template>
    </lab-resource>
  `,
})
export default class NotificationPage {
  /**
   * Notification id input signal
   * - received from the `router`
   */
  public readonly id: InputSignal<string | undefined> = input<string>();

  /**
   * Notification resource
   * - Loaded by the notification service
   */
  protected readonly notificationResource: Resource<NotificationDto> =
    rxResource({
      request: () => ({ id: this.id() || '' }),
      loader: (params: ResourceLoaderParams<{ id: string }>) =>
        this.notificationService.getNotificationById(params.request.id),
    });

  private readonly notificationService: NotificationService =
    inject(NotificationService);
}
