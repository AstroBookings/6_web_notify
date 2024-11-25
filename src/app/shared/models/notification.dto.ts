import { NotificationStatus } from './notifications-status.enum';

/**
 * DTO with the notification data
 * It represents a message that will be sent to a recipient
 */
export type NotificationDto = {
  /**
   *The id of the notification
   * @example 'ntf_123'
   */
  id: string;

  /**
   *The id of the template
   * @example 'tpl_123'
   */
  templateId: string;

  /**
   *The id of the user who created the notification
   * @example 'usr_123'
   */
  userId: string;

  /**
   *The data of the notification
   * @example '{"bookingId": "bkn_123"}'
   */
  data: string;

  /**
   *The recipient of the notification
   * @example 'john@example.com'
   */
  recipient: string;

  /**
   *The subject of the notification
   * @example 'Booking Scheduled'
   */
  subject: string;

  /**
   *The message of the notification
   * @example 'Hello, John! Your booking bkn_123 is scheduled.'
   */
  message: string;

  /**
   *The status of the notification (pending, sent, failed)
   * @example 'pending'
   */
  status: NotificationStatus;

  /**
   *The created at date of the notification
   * @example '2031-01-01T00:00:00Z'
   */
  createdAt: Date;

  /**
   *The updated at date of the notification
   * @example '2031-01-01T00:00:00Z'
   */
  updatedAt: Date;
};

/**
 * Null notification DTO
 * - Used to avoid null errors in the template
 */
export const NullNotificationDto: NotificationDto = {
  id: '',
  templateId: '',
  userId: '',
  data: '',
  recipient: '',
  subject: '',
  message: '',
  status: 'pending',
  createdAt: new Date(),
  updatedAt: new Date(),
};
