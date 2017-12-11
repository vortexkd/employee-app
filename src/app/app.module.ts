import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { EmployeeService } from './employee.service';
import { EmployeeComponent }      from './employee/employee.component';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
	EmployeeComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
