import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { ResponsabilitiesService } from '../../services/responsabilities.service';
import { forkJoin, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-actives-graph',
  templateUrl: './actives-graph.component.html',
  styleUrls: ['./actives-graph.component.css'],
})
export class ActivesGraphComponent implements OnInit {
  constructor(private respService: ResponsabilitiesService) {}
  establishments: string[] = [];
  labels: string[] = [];
  quantities: number[] = [];
  ngOnInit(): void {
    this.respService
      .getResponsabilities()
      .pipe(
        switchMap((data) => {
          /* guardo los establecimientos */
          this.establishments = data.map((x) => x.establishment);
          /* devuelvo un observable con la data de cada establecimiento y su cantidad moviéndome por los establecimientos */
          const observables = this.establishments.map((estab) =>
            this.respService.searchActivesByEstablishment(estab)
          );
          return forkJoin(observables);
        }),
        /* capturo ese resultado ,limpio el array de cantidades ,recorro el array de resultados y agrego a cada arreglo de labels y data el elemento */
        tap((res) => {
          this.quantities = [];
          res.forEach((r) => {
            if (r != null) {
              this.labels.push(r.establishment);
              this.quantities.push(r.quanty);
            }
          });
          /* actualizo los componentes para que se dibuje  mi gráfica */
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
