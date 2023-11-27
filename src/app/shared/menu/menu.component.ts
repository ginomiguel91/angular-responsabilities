import { Component } from '@angular/core';
import {
  IconDefinition,
  faListUl,
  faFileCirclePlus,
  faBarChart,
  faChartSimple,
} from '@fortawesome/free-solid-svg-icons';
export interface MenuItem {
  texto: string;
  ruta: string;
  icon: IconDefinition;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class MenuComponent {
  items: MenuItem[] = [
    {
      texto: 'Responsabilities list',
      ruta: '/responsabilities/list',
      icon: faListUl,
    },

    {
      texto: 'Add Responsability',
      ruta: '/responsabilities/add',
      icon: faFileCirclePlus,
    },

    {
      texto: 'Paid Graph',
      ruta: '/graphs/paidGraph',
      icon: faBarChart,
    },
    {
      texto: 'Pend Graph',
      ruta: '/graphs/pendGraph',
      icon: faBarChart,
    },
    {
      texto: 'Actives Graph',
      ruta: 'graphs/activesGraph',
      icon: faChartSimple,
    },
    {
      texto: 'Inactives Graph',
      ruta: 'graphs/inactivesGraph',
      icon: faChartSimple,
    },
  ];
}
