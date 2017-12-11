import { Component, OnInit } from '@angular/core';

import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

	employees: Employee[] = [];
	constructor(public employeeService: EmployeeService) { }

	ngOnInit() {
		this.getEmployees();
	}
  
	getEmployees(): void {
		this.employeeService.getEmployees()
			.subscribe(employees => { //ここにオブジェクトで返されてるようなんですが、もっと綺麗な変更方法ありますでしょうか
				var i = 1;
				while(employees[i]){
					this.employees.push(
						new Employee(
							employees[i]['id'],
							employees[i]['code'],
							employees[i]['name'],
							employees[i]['join_at'],
							employees[i]['department_code']
						));
					i++;
				}
			});
	}
	logEmployees(): void {
			console.log(this.employees);
		//alert();
	}
}
