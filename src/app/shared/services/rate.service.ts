import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/models';

const defaultHeaders = new HttpHeaders({ 'content-type': 'application/json' });

@Injectable({
  providedIn: 'root',
})
export class RateService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>('/api/bpi/currentprice.json', {
      headers: defaultHeaders,
    });
  }
}
