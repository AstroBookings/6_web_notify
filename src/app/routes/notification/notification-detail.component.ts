import { Component, input } from '@angular/core';
import { NotificationDto } from '../../shared/models/notification.dto';

@Component({
  selector: 'lab-notification-detail',
  template: `
    @if (notification()) {
    <h3>{{ notification()?.subject }}</h3>
    <p>{{ notification()?.message }}</p>
    } @else {
    <p>No notification found</p>
    }
  `,
})
export class NotificationDetailComponent {
  public readonly notification = input<NotificationDto>();
}
