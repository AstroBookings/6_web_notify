import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotificationDto } from '../../shared/models/notification.dto';

@Component({
  selector: 'lab-notifications-list',
  imports: [RouterLink],
  template: `
    <ul>
      @for (notification of notifications(); track notification.id) {
      <li>
        <a [routerLink]="['/notification', notification.id]">{{
          notification.message
        }}</a>
      </li>
      }
    </ul>
  `,
})
export class NotificationsListComponent {
  public readonly notifications = input<NotificationDto[]>([]);
}
