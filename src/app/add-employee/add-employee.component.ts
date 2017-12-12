import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  name: string;
  joined_date: string;
  dept_code: string;
  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.name = '';
    this.joined_date = '';
    this.dept_code = '';
  }

  log(): void {
    if (this.name === '' || this.joined_date === '' || this.dept_code === '') {
      console.log('Please fill out the fields.');
      return;
    }
    this.employeeService.insertEmployee(this.name, this.joined_date, this.dept_code).subscribe(
      response => {
        this.name = '';
        this.joined_date = '';
        this.dept_code = '';
        if (!this.router.navigateByUrl('/employees')) {
          console.log('Something went wrong' + response);
        }
      }
    );
  }


}
