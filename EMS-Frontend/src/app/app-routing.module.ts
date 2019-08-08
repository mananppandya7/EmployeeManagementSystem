import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEditEmpComponent } from './employee/add-edit-emp/add-edit-emp.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  {
    path: 'employee', component: EmployeeComponent, children: [
      { path: 'new', component: AddEditEmpComponent },
      { path: ':id', component: AddEditEmpComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
