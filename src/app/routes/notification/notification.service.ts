import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsRepository } from '../../shared/api/notifications.repository';
import { NotificationDto } from '../../shared/models/notification.dto';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notificationsRepository = inject(NotificationsRepository);

  public getNotificationById(id: string): Observable<NotificationDto> {
    return this.notificationsRepository.getById(id);
  }
}
