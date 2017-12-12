import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import {Observable} from 'rxjs/Observable';
// import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import {Employee} from './employee';
import {MyResponse} from './my-response';
import {catchError, tap} from 'rxjs/operators';
import {forEach} from '@angular/router/src/utils/collection';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const STATUS_OK = 'OK';

@Injectable()
export class EmployeeService {

  private dataUrl = 'http://localhost:9000/';
  private all = 'employees';

  constructor(private http: HttpClient) {
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<MyResponse>(this.dataUrl + this.all).map(
      (response: MyResponse) => this.handleResponse(response));
  }

  filterEmployees(query: string, filter: number): Observable<Employee[]> {
    const params = {queryCriteria: query, column: filter};
    console.log(query);
    return this.http.post<MyResponse>(this.dataUrl + 'query', params).map(
      (response: MyResponse) => this.handleResponse(response));
  }

  insertEmployee(name: string, join_date: string, dept: string) {
    const params = {name: name, join_date: join_date, department: dept};
    return this.http.post<MyResponse>(this.dataUrl + 'add', params).map(
      (response: MyResponse) => response);
  }

  private castToEmployeeList(employees: Array<object>): Employee[] {
    const result = [];
    let i = 1;
    while (employees[i]) {
          result.push(
            new Employee(
              employees[i]['id'],
              employees[i]['code'],
              employees[i]['name'],
              employees[i]['join_at'],
              employees[i]['department_code']
            ));
          i++;
        }
    return result;
  }
  private handleResponse(response: MyResponse): Employee[] {
    if (response.status !== STATUS_OK) {
      return [];
    }
    console.log(response);
    return this.castToEmployeeList(response.ret);
  }
}
