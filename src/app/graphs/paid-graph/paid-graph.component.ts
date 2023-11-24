import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { forkJoin, map, switchMap, tap } from 'rxjs';
import { ResponsabilitiesService } from 'src/app/services/responsabilities.service';
@Component({
  selector: 'app-paid-graph',
  templateUrl: './paid-graph.component.html',
  styleUrls: ['./paid-graph.component.css'],
})
export class PaidGraphComponent implements OnInit {
  constructor(private respService: ResponsabilitiesService) {}

  establishments: string[] = [];
  amounts: number[] = [];
  labels: string[] = [];
  colors: string[] = [];
  labelInfo: string = 'TOTAL Amount Paid by Establishments(USD)';
  ngOnInit(): void {
    this.respService
      .getResponsabilities()
      .pipe(
        switchMap((data) => {
          this.establishments = data.map((x) => x.establishment);
          // Devolvemos un array de observables
          const observables = this.establishments.map((estab) =>
            this.respService.totalAPaidByEstablishment(estab)
          );
          // Utilizamos forkJoin para combinar los resultados de los observables en un array
          return forkJoin(observables);
        }),
        tap((results) => {
          console.log('results', results);
          // Limpiamos el array antes de asignar nuevos valores
          this.amounts = [];

          // Iteramos sobre los resultados y agregamos al array
          results.forEach((result) => {
            // Suponemos que result es un objeto con una propiedad amount
            this.amounts.push(result.amount);
            this.labels.push(result.establishment);
            const color = this.getRandomColor();
            this.colors.push(color);
          });

          console.log('establishments:', this.establishments);
          console.log('amounts:', this.amounts);

          // Actualiza los datos del gráfico aquí
          this.barChartPaidData.labels = this.labels;
          this.barChartPaidData.datasets[0].data = this.amounts;
          this.barChartPaidData.datasets[0].backgroundColor = this.colors;
          this.barChartPaidData.datasets[0].label = this.labelInfo;
          this.chart?.update();
        })
      )
      .subscribe();
  }
  // Función para generar un color hexadecimal aleatorio
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public barChartType: ChartType = 'bar';

  public barChartPaidData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Establishment',
        backgroundColor: this.getRandomColor(),
        hoverBackgroundColor: 'red',
      },
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }
}
