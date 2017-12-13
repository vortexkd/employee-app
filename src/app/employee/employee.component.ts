import {Component, OnInit} from '@angular/core';
import { NgModel } from '@angular/forms';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];
  public filter = 0;
  query = '';

  constructor(public employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      employees => {
        // console.log(employees);
        this.employees = employees;
      }
    );
  }

  getWithFilter(): void {
    // console.log(this.filter);
    if(this.filter === 0) {
      this.query = '';
      return this.getEmployees();
    }
    this.employeeService.filterEmployees(this.query, this.filter).subscribe(
      employees => {
        // console.log(employees);
        this.employees = employees;
      }
    );
  }


  changeFilter(update: number):  void {
    if (update === 0 || update === 1 || update === 2 || update === 3) {
      this.filter = update;
    } else {
      this.filter = 0;
    }
  }
}
