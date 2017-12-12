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

  private dataUrl = 'http://localhost:9000/employees';

  constructor(private http: HttpClient) {
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<MyResponse>(this.dataUrl).map(
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
