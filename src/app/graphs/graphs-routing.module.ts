import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaidGraphComponent } from './paid-graph/paid-graph.component';
import { PendGraphComponent } from './pend-graph/pend-graph.component';
import { ActivesGraphComponent } from './actives-graph/actives-graph.component';
import { InactivesGraphComponent } from './inactives-graph/inactives-graph.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'paidGraph',
        component: PaidGraphComponent,
      },

      {
        path: 'pendGraph',
        component: PendGraphComponent,
      },

      {
        path: 'activesGraph',
        component: ActivesGraphComponent,
      },

      {
        path: 'inactivesGraph',
        component: InactivesGraphComponent,
      },
      {
        path: '**',
        redirectTo: 'paidGraph',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphsRoutingModule {}
