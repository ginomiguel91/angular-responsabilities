import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRespComponent } from './add-resp/add-resp.component';
import { ShowRespComponent } from './show-resp/show-resp.component';
import { ListRespComponent } from './list-resp/list-resp.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListRespComponent,
      },
      {
        path: 'add',
        component: AddRespComponent,
      },
      {
        path: 'edit/:id',
        component: AddRespComponent,
      },
      {
        path: ':id',
        component: ShowRespComponent,
      },

      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponsabilitiesRoutingModule {}
