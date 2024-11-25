import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routes/home/home.page'),
  },
  {
    path: 'notification/:id',
    loadComponent: () => import('./routes/notification/notification.page'),
  },
];
