import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./system/timeline/timeline.module').then(m => m.TimelineModule),
    pathMatch: 'full'
  },
  {
    path: 'project',
    loadChildren: () => import('./system/project/project.module').then(m => m.ProjectModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
