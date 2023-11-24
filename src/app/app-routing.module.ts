import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'responsabilities',
    loadChildren: () =>
      import('./responsabilities/responsabilities.module').then(
        (m) => m.ResponsabilitiesModule
      ),
  },

  {
    path: 'graphs',
    loadChildren: () =>
      import('./graphs/graphs.module').then((m) => m.GraphsModule),
  },

  {
    path: '**',
    redirectTo: 'responsabilities',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
