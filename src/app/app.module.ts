import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from './employee.service';
import { EmployeeComponent } from './employee/employee.component';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent, EmployeeComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
