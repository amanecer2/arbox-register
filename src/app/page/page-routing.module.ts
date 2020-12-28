import {NgModule, OnInit} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'boxes',
    loadChildren: () => import('./box/box.module').then(m => m.BoxModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule{
}
