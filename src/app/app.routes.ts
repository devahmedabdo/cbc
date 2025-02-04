import { CommentComponent } from './modules/comment/comment.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/comment/comment.component').then(
        (m) => m.CommentComponent
      ),
  },
];
