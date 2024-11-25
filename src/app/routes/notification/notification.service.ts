import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsRepository } from '../../shared/api/notifications.repository';
import { NotificationDto } from '../../shared/models/notification.dto';

/**
 * Notification service
 * - Handles the notification logic
 * @requires NotificationsRepository to get the notifications
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notificationsRepository = inject(NotificationsRepository);

  /**
   * Get notification by id
   * @param id - Notification id
   * @returns Observable<NotificationDto>
   */
  public getNotificationById(id: string): Observable<NotificationDto> {
    return this.notificationsRepository.getById(id);
  }
}
