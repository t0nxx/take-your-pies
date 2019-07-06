import { Injectable } from '@angular/core';
import { API } from '../../../global'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PieDto } from './pie.dto';
@Injectable({
  providedIn: 'root'
})
export class PieService {

  api = API;

  constructor(private http: HttpClient) { }

  getAllPies(page: number, skip: number): Observable<any> {
    return this.http.get(`${this.api}/pie?page=${page}&limit=${skip}`);
  }

  addNewPie(data: FormData): Observable<any> {
    return this.http.post(`${this.api}/pie/new`, data);
  }
}
