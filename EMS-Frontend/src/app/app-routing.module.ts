import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEditEmpComponent } from './employee/add-edit-emp/add-edit-emp.component';
import { EmployeeComponent } from './employee/employee.component';
import { UploadTypeOneComponent } from './document/upload-type-one/upload-type-one.component';
import { UploadTypeTwoComponent } from './document/upload-type-two/upload-type-two.component';
import { DocumentComponent } from './document/document.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  {
    path: 'employee', component: EmployeeComponent, children: [
      { path: 'new', component: AddEditEmpComponent },
      { path: ':id', component: AddEditEmpComponent }
    ]
  },
  {
    path: 'document', component: DocumentComponent, children: [
      { path: 'type1', component: UploadTypeOneComponent },
      { path: 'type2', component: UploadTypeTwoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
