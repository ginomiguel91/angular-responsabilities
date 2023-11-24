import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take, tap } from 'rxjs';
import { MatResp } from 'src/app/interfaces/responsabilities.interface';
import { ResponsabilitiesService } from 'src/app/services/responsabilities.service';

@Component({
  selector: 'app-show-resp',
  templateUrl: './show-resp.component.html',
  styleUrls: ['./show-resp.component.css'],
})
export class ShowRespComponent implements OnInit {
  responsability!: MatResp;
  constructor(
    private route: Router,
    private respService: ResponsabilitiesService,
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.respService.getResponsability(id)),
        tap((res) => {
          console.log(res);
        })
      )
      .subscribe({
        next: (result) => {
          this.responsability = result;
          console.log('result:', result);
        },
        error: (err) => {
          console.log(err, 'error');
        },
      });
  }
}
