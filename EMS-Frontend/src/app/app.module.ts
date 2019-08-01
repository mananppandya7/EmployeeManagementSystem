import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarmenuComponent } from './sidebarmenu/sidebarmenu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddEditEmpComponent } from './employee/add-edit-emp/add-edit-emp.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarmenuComponent,
    DashboardComponent,
    FooterComponent,
    EmployeeComponent,
    AddEditEmpComponent,
    PageHeaderComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
