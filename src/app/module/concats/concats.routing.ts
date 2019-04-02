import { Routes } from '@angular/router';
import { ConcatsMainComponent } from './concats-main/concats-main.component';

export const routes: Routes = [
    {
        path: 'concats',
        pathMatch: 'full',
        component: ConcatsMainComponent
    }
];
