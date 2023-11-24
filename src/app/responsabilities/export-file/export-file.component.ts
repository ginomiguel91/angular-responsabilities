import { Component, EventEmitter, Output } from '@angular/core';
import {
  faFileExcel,
  faFileWord,
  faFilePdf,
  faFileExport,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { ResponsabilitiesService } from 'src/app/services/responsabilities.service';
export interface ExportFile {
  text: string;
  type: string;
  icon: IconDefinition;
}

@Component({
  selector: 'app-export-file',
  templateUrl: './export-file.component.html',
  styleUrls: ['./export-file.component.css'],
})
export class ExportFileComponent {
  files: ExportFile[] = [
    {
      text: 'Word file',
      type: 'word',
      icon: faFileWord,
    },
    {
      text: 'Excel file',
      type: 'excel',
      icon: faFileExcel,
    },

    {
      text: 'Pdf file',
      type: 'pdf',
      icon: faFilePdf,
    },
  ];
  faFileExcel = faFileExcel;
  faFileWord = faFileWord;
  faFilePdf = faFilePdf;
  faFileExport = faFileExport;
  constructor(private respService: ResponsabilitiesService) {}

  @Output() onExportFileEvent = new EventEmitter<string>();

  OnExportFile(value: string) {
    this.onExportFileEvent.emit(value);
  }
}
