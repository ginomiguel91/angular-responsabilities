import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from '../app-routing.module';
import { AppModule } from '../app.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [MenuComponent],
  imports: [AppRoutingModule, CommonModule, FontAwesomeModule],
  exports: [MenuComponent],
})
export class SharedModule {}
