import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { forkJoin, switchMap, tap } from 'rxjs';
import { ResponsabilitiesService } from 'src/app/services/responsabilities.service';

@Component({
  selector: 'app-inactives-graph',
  templateUrl: './inactives-graph.component.html',
  styleUrls: ['./inactives-graph.component.css'],
})
export class InactivesGraphComponent implements OnInit {
  constructor(private respService: ResponsabilitiesService) {}
  establishments: string[] = [];
  labels: string[] = [];
  quantities: number[] = [];
  ngOnInit(): void {
    this.respService
      .getResponsabilities()
      .pipe(
        switchMap((data) => {
          this.establishments = data.map((x) => x.establishment);
          const observables = this.establishments.map((estab) =>
            this.respService.searchInactivesByEstablishment(estab)
          );
          return forkJoin(observables);
        }),

        /* Del arreglo resultante recorro sus elementos y actualizo los arreglos de labels(establecimientos) y sus cantidades */
        tap((results) => {
          console.log('results:', results);
          /* actualizo las propiedades de mi gráfica */

          this.quantities = [];

          results.forEach((y) => {
            if (y != null) {
              this.labels.push(y.establishment);
              this.quantities.push(y.quanty);
            }
          });

          console.log('establishments:', this.labels);
          console.log('quantities:', this.quantities);

          this.doughnutChartData.labels = this.labels;
          this.doughnutChartData.datasets[0].data = this.quantities;
        })
      )
      .subscribe();
  }

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';
}
