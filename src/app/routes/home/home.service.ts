import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsRepository } from '../../shared/api/notifications.repository';
import { NotificationDto } from '../../shared/models/notification.dto';

/**
 * Home service
 * - Handles the home logic
 * @requires NotificationsRepository to get the notifications
 */
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly notificationsRepository = inject(NotificationsRepository);

  /**
   * Get all notifications
   * @returns Observable<NotificationDto[]>
   */
  public getAllNotifications(): Observable<NotificationDto[]> {
    return this.notificationsRepository.getAll();
  }
}
