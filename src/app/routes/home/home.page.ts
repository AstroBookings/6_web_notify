import { Component, inject, Resource } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NotificationDto } from '../../shared/models/notification.dto';
import { ResourceBlock } from '../../shared/ui/resource.block';
import { HomeService } from './home.service';
import { NotificationsListComponent } from './notifications-list.component';

/**
 * Home page component
 * - Routed to /
 * - Displays a list of notifications
 * @requires HomeService to get the notifications
 * @requires NotificationsListComponent to display the list of notifications
 * @requires ResourceBlock to display the resource signal (status and value or error)
 */
@Component({
  selector: 'lab-home-page',
  imports: [NotificationsListComponent, ResourceBlock],
  template: `
    <h1>Home</h1>
    <lab-resource [resource]="notificationsResource" [dataTemplate]="notificationsList">
      <ng-template #notificationsList let-notifications>
        <lab-notifications-list [notifications]="notifications" />
      </ng-template>
    </lab-resource>
  `,
})
export default class HomePage {
  /**
   * Notifications resource
   * - Loaded by the home service
   */
  protected readonly notificationsResource: Resource<NotificationDto[]> =
    rxResource({
      loader: () => this.homeService.getAllNotifications(),
    });

  private readonly homeService: HomeService = inject(HomeService);
}
