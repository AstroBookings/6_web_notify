import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  computed,
  inject,
  Resource,
  ResourceStatus,
  Signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NotificationDto } from '../../shared/models/notification.dto';
import { ErrorAtom } from '../../shared/ui/error.atom';
import { LoadingAtom } from '../../shared/ui/loading.atom';
import { HomeService } from './home.service';
import { NotificationsListComponent } from './notifications-list.component';

/**
 * Home page component
 * - Routed to /
 * - Displays a list of notifications
 * @requires HomeService to get the notifications
 * @requires NotificationsListComponent to display the list of notifications
 * @requires ErrorAtom to display the error
 * @requires LoadingAtom to display the loading
 */
@Component({
  selector: 'lab-home-page',
  imports: [NotificationsListComponent, ErrorAtom, LoadingAtom],
  template: `
    <h1>Home</h1>
    @switch (status()) { @case ('Loading') {
    <lab-loading />
    } @case ('Error') {
    <lab-error [error]="error()" />
    } @case ('Resolved') {
    <lab-notifications-list [notifications]="notificationsValue()" />
    } }
  `,
})
export default class HomePage {
  private readonly homeService: HomeService = inject(HomeService);
  private readonly notificationsResource: Resource<NotificationDto[]> =
    rxResource({
      loader: () => this.homeService.getAllNotifications(),
    });

  /**
   * Status of the notifications resource
   * - Casted to a string to be used in the template
   */
  protected readonly status: Signal<string> = computed(
    () => ResourceStatus[this.notificationsResource.status()]
  );
  /**
   * Error of the notifications resource
   * - Casted to a string to be used in the template
   */
  protected readonly error: Signal<string> = computed(() => {
    const error = this.notificationsResource.error();
    return error ? (error as HttpErrorResponse).message : JSON.stringify(error);
  });
  /**
   * Value of the notifications resource
   * - Defaults to an empty array
   */
  protected readonly notificationsValue: Signal<NotificationDto[]> = computed(
    () => this.notificationsResource.value() || []
  );
}
