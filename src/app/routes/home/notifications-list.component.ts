import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotificationDto } from '../../shared/models/notification.dto';

/**
 * Notifications list component
 * - Displays the notifications list
 */
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
      } @empty {
      <li>No notifications found</li>
      }
    </ul>
  `,
})
export class NotificationsListComponent {
  /**
   * Notifications input signal
   * - Required to avoid null errors in the template
   */
  public readonly notifications: InputSignal<NotificationDto[]> =
    input.required<NotificationDto[]>();
}
