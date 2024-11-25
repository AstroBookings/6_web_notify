import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationDto } from '../models/notification.dto';

@Injectable({
  providedIn: 'root',
})
export class NotificationsRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3106/api';
  private readonly notificationsUrl = `${this.apiUrl}/notifications`;

  /**
   * Get all notifications
   * @returns Observable<NotificationDto[]>
   */
  public getAll(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(this.notificationsUrl);
  }

  /**
   * Get notification by id
   * @param id - Notification id
   * @returns Observable<NotificationDto>
   */
  public getById(id: string): Observable<NotificationDto> {
    return this.http.get<NotificationDto>(`${this.notificationsUrl}/${id}`);
  }
}
