import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employee: Employee;
  name = '';
  date = '';
  dept = '';

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.employeeService.filterEmployees(id, 3).subscribe(
      employee => {
        if (employee.length === 1) {
          this.employee = employee[0];
          this.name = this.employee.name;
          this.date = this.employee.join_date;
          this.dept = this.employee.dept_code;
        } else {
          console.log('No such employee');
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.employeeService.updateEmployee(this.employee.id.toString(), this.name, this.date, this.dept).subscribe(
      response => {
        this.name = '';
        this.date = '';
        this.dept = '';
        if (!this.location.back()) {
          console.log('Something went wrong' + response);
        }
    });
  }
}
