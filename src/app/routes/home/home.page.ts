import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  computed,
  inject,
  ResourceStatus,
  Signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ErrorAtom } from '../../shared/ui/error.atom';
import { LoadingAtom } from '../../shared/ui/loading.atom';
import { HomeService } from './home.service';
import { NotificationsListComponent } from './notifications-list.component';

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
    <lab-notifications-list [notifications]="notifications.value() || []" />
    } }
  `,
})
export default class HomePage {
  private readonly homeService = inject(HomeService);
  protected readonly notifications = rxResource({
    loader: () => this.homeService.getAllNotifications(),
  });
  protected readonly status = computed(
    () => ResourceStatus[this.notifications.status()]
  );
  protected readonly error: Signal<string> = computed(() => {
    const error = this.notifications.error();
    return error ? (error as HttpErrorResponse).message : JSON.stringify(error);
  });
}
