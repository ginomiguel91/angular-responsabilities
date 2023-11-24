import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsabilitiesRoutingModule } from './responsabilities-routing.module';
import { AddRespComponent } from './add-resp/add-resp.component';
import { ShowRespComponent } from './show-resp/show-resp.component';
import { ListRespComponent } from './list-resp/list-resp.component';
import { ResponsabilityComponent } from './responsability/responsability.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { ExportFileComponent } from './export-file/export-file.component';

@NgModule({
  declarations: [
    AddRespComponent,
    ShowRespComponent,
    ListRespComponent,
    ResponsabilityComponent,
    ExportFileComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ResponsabilitiesRoutingModule,
  ],
  exports: [ResponsabilityComponent],
})
export class ResponsabilitiesModule {}
