import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Employee } from './employee';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EmployeeService {
	
	private dataUrl = 'http://localhost:9000/employees';
	employees: Employee[];

  constructor(private http: HttpClient) { }
  
  getEmployees(): Employee[]{
	  return this.http.get<Employee[]>(this.dataUrl);
  }
