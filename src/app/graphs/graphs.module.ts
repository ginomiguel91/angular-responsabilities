import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphsRoutingModule } from './graphs-routing.module';
import { PendGraphComponent } from './pend-graph/pend-graph.component';
import { PaidGraphComponent } from './paid-graph/paid-graph.component';
import { NgChartsModule } from 'ng2-charts';
import { ActivesGraphComponent } from './actives-graph/actives-graph.component';
import { InactivesGraphComponent } from './inactives-graph/inactives-graph.component';

@NgModule({
  declarations: [PendGraphComponent, PaidGraphComponent, ActivesGraphComponent, InactivesGraphComponent],
  imports: [CommonModule, GraphsRoutingModule, NgChartsModule],
})
export class GraphsModule {}
