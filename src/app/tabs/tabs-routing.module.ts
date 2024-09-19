import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'wordle',
        loadChildren: () => import('./wordle/wordle.module').then(m => m.WordlePageModule)
      },
      {
        path: 'password',
        loadChildren: () => import('./password/password.module').then( m => m.PasswordPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/wordle',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/wordle',
    pathMatch: 'full'
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
