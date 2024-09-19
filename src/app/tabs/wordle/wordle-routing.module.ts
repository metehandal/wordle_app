import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordlePage } from './wordle.page';

const routes: Routes = [
  {
    path: '',
    component: WordlePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordlePageRoutingModule {}
