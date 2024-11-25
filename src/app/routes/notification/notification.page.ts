import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  computed,
  inject,
  input,
  Resource,
  ResourceStatus,
  Signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NotificationDto } from '../../shared/models/notification.dto';
import { ErrorAtom } from '../../shared/ui/error.atom';
import { LoadingAtom } from '../../shared/ui/loading.atom';
import { NotificationDetailComponent } from './notification-detail.component';
import { NotificationService } from './notification.service';

@Component({
  selector: 'lab-notification',
  imports: [NotificationDetailComponent, LoadingAtom, ErrorAtom],
  template: `
    @switch (status()) { @case ('Loading') {
    <lab-loading /> } @case ('Error') { <lab-error [error]="error()" /> } @case
    ('Resolved') {
    <lab-notification-detail [notification]="notification.value()" /> } }
  `,
})
export default class NotificationPage {
  public readonly id = input<string>();
  private readonly notificationService = inject(NotificationService);

  protected readonly notification: Resource<NotificationDto> = rxResource({
    request: () => ({ id: this.id() || '' }),
    loader: (params) =>
      this.notificationService.getNotificationById(params.request.id),
  });

  protected readonly status = computed(
    () => ResourceStatus[this.notification.status()]
  );
  protected readonly error: Signal<string> = computed(() => {
    const error = this.notification.error();
    return error ? (error as HttpErrorResponse).message : JSON.stringify(error);
  });
}
