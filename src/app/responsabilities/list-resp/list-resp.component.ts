import { Component, OnInit } from '@angular/core';
import { MatResp } from '../../interfaces/responsabilities.interface';
import { Router } from '@angular/router';
import { ResponsabilitiesService } from 'src/app/services/responsabilities.service';
import {
  faEdit,
  faSearchDollar,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-list-resp',
  templateUrl: './list-resp.component.html',
})
export class ListRespComponent implements OnInit {
  faEdit = faEdit;
  faSearchDollar = faSearchDollar;
  faTrash = faTrash;

  constructor(
    private route: Router,
    private respService: ResponsabilitiesService
  ) {}
  responsabilities: MatResp[] = [];

  ngOnInit(): void {
    this.respService.getResponsabilities().subscribe({
      next: (resp: MatResp[]) => {
        this.responsabilities = resp;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  remove(id: number) {
    this.respService.removeResposability(id).subscribe({
      next: () => {
        console.log('Eliminado con exito');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'The responsability has been removed!',
          showConfirmButton: false,
          timer: 1500,
        });

        this.responsabilities = this.responsabilities.filter(
          (result) => id != result.id
        );
      },
      error: (err: any) => {
        console.log(err, 'Error al eliminar la responsabilidad');
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Something went wrong !',
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  }
  file: string = '';
  nameFile = environment.generalFileConso;
  exportFile(value: string) {
    switch (value) {
      case 'word': {
        this.file = 'word';
        this.respService.exportConsoWordFile().subscribe({
          next: (response: any) => {
            console.log('Exportado con éxito:', response);
            this.downloadFile(
              response,
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              `${this.nameFile}.docx`
            );
          },
          error: (err: any) => {
            console.log('error', err);
          },
        });

        break;
      }

      case 'excel': {
        this.file = 'excel';
        this.respService.exportConsoExcelFile().subscribe({
          next: (response: any) => {
            console.log('Exportado con éxito:', response);
            this.downloadFile(
              response,
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              `${this.nameFile}.xlsx`
            );
          },
          error: (err: any) => {
            console.log('error', err);
          },
        });
        break;
      }
      case 'pdf': {
        this.file = 'pdf';
        this.respService.exportConsoPdfFile().subscribe({
          next: (response: any) => {
            console.log('Exportado con éxito:', response);
            this.downloadFile(
              response,
              'application/pdf',
              `${this.nameFile}.pdf`
            );
          },
          error: (err: any) => {
            console.log('error', err);
          },
        });
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }
  /* Método útil para descargar el fichero */
  private downloadFile(data: any, fileType: string, fileName: string) {
    const blob = new Blob([data], { type: fileType });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);

    link.click();

    // Limpiar después de la descarga
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }
}
