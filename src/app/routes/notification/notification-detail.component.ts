import { Component, input, InputSignal } from '@angular/core';
import { NotificationDto } from '../../shared/models/notification.dto';

/**
 * Notification detail component
 * - Displays the notification detail
 */
@Component({
  selector: 'lab-notification-detail',
  template: `
    <h3>{{ notification().subject }}</h3>
    <p>{{ notification().message }}</p>
  `,
})
export class NotificationDetailComponent {
  /**
   * Notification DTO input signal
   * - Required to avoid null errors in the template
   */
  public readonly notification: InputSignal<NotificationDto> =
    input.required<NotificationDto>();
}
