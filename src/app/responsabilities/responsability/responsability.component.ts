import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatResp } from 'src/app/interfaces/responsabilities.interface';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-responsability',
  templateUrl: './responsability.component.html',
  styleUrls: ['./responsability.component.css'],
})
export class ResponsabilityComponent {
  faArrowLeft = faArrowLeft;
  constructor(private route: Router) {}

  @Input() responsability!: MatResp;

  back() {
    this.route.navigateByUrl('/responsabilities');
  }
}
