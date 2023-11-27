import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.development';
import { MatResp } from '../interfaces/responsabilities.interface';
import { Observable } from 'rxjs';
import { TotalAmount } from '../interfaces/totalAmount.interface';
import { CountActiveInactive } from '../interfaces/countActiveInactive.interface';

@Injectable({
  providedIn: 'root',
})
export class ResponsabilitiesService {
  constructor(private http: HttpClient) {}
  _baseUrl = environment.apiUrl;

  getResponsabilities(): Observable<MatResp[]> {
    const url = `${this._baseUrl}/responsabilities`;

    return this.http.get<MatResp[]>(url);
  }

  getResponsability(id: number): Observable<MatResp> {
    const url = `${this._baseUrl}/responsabilities/${id}`;
    return this.http.get<MatResp>(url);
  }

  createResponsability(body: MatResp): Observable<MatResp> {
    const url = `${this._baseUrl}/responsabilities`;
    return this.http.post<MatResp>(url, body);
  }

  removeResposability(id: number): Observable<any> {
    const url = `${this._baseUrl}/responsabilities/${id}`;

    return this.http.delete<any>(url);
  }

  updateResponsabilityById(resp: MatResp): Observable<MatResp> {
    const url = `${this._baseUrl}/responsabilities/${resp.id}`;
    return this.http.put<MatResp>(url, resp);
  }

  exportConsoWordFile(): Observable<any> {
    const url = `${this._baseUrl}/responsabilities/wordConso`;

    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  exportConsoExcelFile(): Observable<any> {
    const url = `${this._baseUrl}/responsabilities/excelConso`;

    return this.http.get(url, { responseType: 'arraybuffer' });
  }
  exportConsoPdfFile(): Observable<any> {
    const url = `${this._baseUrl}/responsabilities/pdfConso`;

    return this.http.get(url, { responseType: 'arraybuffer' });
  }
  totalAPaidByEstablishment(establishment: string): Observable<TotalAmount> {
    const url = `${this._baseUrl}/responsabilities/totalAPaid?establishment=${establishment}`;
    return this.http.get<TotalAmount>(url);
  }

  totalAPendByEstablishment(establishment: string): Observable<TotalAmount> {
    const url = `${this._baseUrl}/responsabilities/totalAPend?establishment=${establishment}`;
    return this.http.get<TotalAmount>(url);
  }
  searchActivesByEstablishment(
    establishment: string
  ): Observable<CountActiveInactive> {
    const url = `${this._baseUrl}/responsabilities/searchActives?establishment=${establishment}`;
    return this.http.get<CountActiveInactive>(url);
  }
  searchInactivesByEstablishment(
    establishment: string
  ): Observable<CountActiveInactive> {
    const url = `${this._baseUrl}/responsabilities/searchInactives?establishment=${establishment}`;
    return this.http.get<CountActiveInactive>(url);
  }
}
