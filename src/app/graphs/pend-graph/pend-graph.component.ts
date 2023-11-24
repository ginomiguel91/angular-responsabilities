import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { forkJoin, switchMap, tap } from 'rxjs';
import { ResponsabilitiesService } from 'src/app/services/responsabilities.service';

@Component({
  selector: 'app-pend-graph',
  templateUrl: './pend-graph.component.html',
  styleUrls: ['./pend-graph.component.css'],
})
export class PendGraphComponent implements OnInit {
  constructor(private respService: ResponsabilitiesService) {}
  establishments: string[] = [];
  amounts: number[] = [];
  colors: string[] = [];
  labels: string[] = [];
  labelInfo: string = 'TOTAL Amount Pended by Establishments(USD)';
  ngOnInit(): void {
    this.respService
      .getResponsabilities()
      .pipe(
        switchMap((data) => {
          this.establishments = data.map((x) => x.establishment);
          const observables = this.establishments.map((estab) =>
            this.respService.totalAPendByEstablishment(estab)
          );
          return forkJoin(observables);
        }),
        tap((res) => {
          res.forEach((element) => {
            this.amounts.push(element.amount);
            this.labels.push(element.establishment);
            const color = this.getRandomColor();
            this.colors.push(color);
          });

          console.log('establishments:', this.establishments);
          console.log('amounts:', this.amounts);

          this.barChartPendData.labels = this.labels;
          this.barChartPendData.datasets[0].data = this.amounts;
          this.barChartPendData.datasets[0].backgroundColor = this.colors;
          this.barChartPendData.datasets[0].label = this.labelInfo;
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

  public barChartPendData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: '',
        backgroundColor: '',
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
