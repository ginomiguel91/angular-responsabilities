import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponsabilitiesService } from 'src/app/services/responsabilities.service';
import { MatResp } from 'src/app/interfaces/responsabilities.interface';
import Swal from 'sweetalert2';
import {
  faCancel,
  faPlus,
  faTrash,
  faCheckDouble,
  faAsterisk,
  faBan,
} from '@fortawesome/free-solid-svg-icons';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-add-resp',
  templateUrl: './add-resp.component.html',
  styleUrls: ['./add-resp.component.css'],
})
export class AddRespComponent implements OnInit {
  faCancel = faCancel;
  faPlus = faPlus;
  faTrash = faTrash;
  faCheckDouble = faCheckDouble;
  faAsterisk = faAsterisk;
  faBan = faBan;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private respService: ResponsabilitiesService
  ) {}

  responsability: MatResp = {
    id: 0,
    establishment: '',
    updateDate: new Date(),
    status: '',
    itemList: [],
  };
  responsabilitiesForm: FormGroup = this.fb.group({
    establishment: ['', [Validators.required]],
    updateDate: [new Date(), [Validators.required]],
    status: ['', [Validators.required]],
    itemList: this.fb.array([this.addItemFormGroup()]),
  });

  addItemFormGroup(): FormGroup {
    return this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(6)]],
      amountPend: [0, Validators.required],
      amountPaid: [0, Validators.required],
      active: [false],
    });
  }

  get itemList() {
    return this.responsabilitiesForm.get('itemList') as FormArray;
  }
  ngOnInit(): void {
    this.responsabilitiesForm.markAllAsTouched();

    if (!this.route.url.includes('edit')) {
      return;
    }
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.respService.getResponsability(id)),
        tap((res) => {
          this.responsability = res;
          while (this.itemList.length !== 0) {
            this.itemList.removeAt(0);
          }
          for (const item of this.responsability.itemList) {
            this.itemList.push(this.fb.group(item));
          }
          this.responsabilitiesForm.patchValue(this.responsability);
        })
      )
      .subscribe();
  }
  addItem() {
    this.itemList.push(this.addItemFormGroup());
  }
  /* Validación campos formulario principal */
  errorField(field: string): string {
    const controlTextForm = this.responsabilitiesForm.get(field);
    return controlTextForm?.invalid &&
      (controlTextForm.dirty || controlTextForm.touched)
      ? 'form-control is-invalid'
      : 'form-control is-valid';
  }

  msgErrorsClassField(field: string): string {
    if (this.errorField(field) === 'form-control is-invalid') {
      return 'invalid-feedback';
    } else {
      return 'valid-feedback';
    }
  }

  msgErrorValidation(field: string): string {
    if (this.errorField(field) === 'form-control is-invalid') {
      return 'The field' + ' ' + field + ' ' + 'is invalid !';
    } else {
      return 'The field' + ' ' + field + ' ' + 'is valid !';
    }
  }

  /* Validación de los items */
  itemsErrorsField(index: number, field: string): string {
    const itemControl = this.itemList.at(index).get(field);
    return itemControl?.invalid && (itemControl.dirty || itemControl.touched)
      ? 'form-control is-invalid'
      : 'form-control is-valid';
  }

  msgItemsErrorsClassField(index: number, field: string) {
    if (this.itemsErrorsField(index, field) === 'form-control is-invalid') {
      return 'invalid-feedback';
    } else {
      return 'valid-feedback';
    }
  }

  msgItemsErrorsFieldValidation(index: number, field: string) {
    if (this.itemsErrorsField(index, field) === 'form-control is-invalid') {
      return 'The field' + ' ' + field + ' ' + ' is invalid !';
    } else {
      return 'The field' + ' ' + field + ' ' + ' is valid !';
    }
  }

  get establishment() {
    return this.responsabilitiesForm.get('establishment');
  }

  get status() {
    return this.responsabilitiesForm.get('status');
  }

  removeItem(index: number): void {
    this.itemList.removeAt(index);
  }

  saveResponsability() {
    /* caso update */
    const updatedResponsability = {
      ...this.responsability,
      ...this.responsabilitiesForm.value,
    };
    if (this.responsability.id) {
      this.respService
        .updateResponsabilityById(updatedResponsability)
        .subscribe({
          next: (response) => {
            this.responsabilitiesForm.patchValue(response);
            this.route.navigateByUrl('/responsabilities/list');
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'The responsability has been updated !',
              showConfirmButton: false,
              timer: 1500,
            });
          },

          error: (err) => {
            console.log('error:', err);
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Something went wrong !',
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
    } else {
      /* caso agregar */
      const body = this.responsabilitiesForm.value;

      this.respService.createResponsability(body).subscribe({
        next: (response) => {
          this.responsabilitiesForm.patchValue(response);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'The responsability has been saved !',
            showConfirmButton: false,
            timer: 1500,
          });
          console.log('Se ha guardado la responsabilidad correctamente');
          this.route.navigateByUrl('/responsabilities/list');
        },
        error: (error) => {
          console.log('error:', error);
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
  }
}
