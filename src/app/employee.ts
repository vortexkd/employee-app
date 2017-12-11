export class Employee {
	id: number;
	code: string;
	name: string;
	join_date: string;
	dept_code: string;
	
	constructor(id: number, code: string, name: string, join_date:string, dept_code:string) {
		this.id = id;
		this.code = code;
		this.name = name;
		this.join_date = join_date;
		this.dept_code = dept_code;
		}
	
}