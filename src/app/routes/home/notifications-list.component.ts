import { Component, input } from '@angular/core';
import { NotificationDto } from '../../shared/models/notification.dto';

@Component({
  selector: 'lab-notifications-list',
  template: `
    <ul>
      @for (notification of notifications(); track notification.id) {
      <li>{{ notification.message }}</li>
      }
    </ul>
  `,
})
export class NotificationsListComponent {
  public readonly notifications = input<NotificationDto[]>([]);
}
