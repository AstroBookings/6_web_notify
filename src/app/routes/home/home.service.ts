import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsRepository } from '../../shared/api/notifications.repository';
import { NotificationDto } from '../../shared/models/notification.dto';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly notificationsRepository = inject(NotificationsRepository);

  public getAllNotifications(): Observable<NotificationDto[]> {
    return this.notificationsRepository.getAll();
  }
}
