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
      (response: MyResponse) => {
        console.log(response);
        if (response.status !== STATUS_OK) {
          console.log(response.message);
          return [];
        }
        return this.castToEmployeeList(response.ret);
      }
    );
  }

  filterEmployees(query: string, filter: number): Observable<Employee[]> {
    const params = {queryCriteria: query, column: filter};
    console.log(query);
    return this.http.post<MyResponse>(this.dataUrl + 'query', params).map(
      (response: MyResponse) => {
        console.log(response);
        if (response.status !== STATUS_OK) {
          console.log(response.message);
          return [];
        }
        return this.castToEmployeeList(response.ret);
      }
    );
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
    console.log(result);
    return result;
  }
}
