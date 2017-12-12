import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeComponent } from '../employee/employee.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeComponent },
  { path: 'add', component: AddEmployeeComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
