import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from 'ng2-file-upload';
import { AgGridModule } from 'ag-grid-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { DataTablesModule } from 'angular-datatables';

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
import { DocumentComponent } from './document/document.component';
import { UploadTypeOneComponent } from './document/upload-type-one/upload-type-one.component';
import { UploadTypeTwoComponent } from './document/upload-type-two/upload-type-two.component';
import { EmpListComponent } from './employee/emp-list/emp-list.component';
import { ButtonRenderedComponent } from './employee/button-rendered/button-rendered.component';
import { AuthorizationComponent } from './authorization/authorization.component';
//import { AuthInterceptorService } from './auth.interceptor.service';
import { LoginComponent } from './login/login.component';
import { EMSConstants } from './common/ems.constants';
import { AgGridComponent } from './employee/emp-list/ag-grid/ag-grid.component';
import { AngularDatatableComponent } from './employee/emp-list/angular-datatable/angular-datatable.component';
import { ImageRenderedComponent } from './employee/image-rendered/image-rendered.component';
import { EmpDetailComponent } from './employee/emp-detail/emp-detail.component';

// Secret Keys for google & Facebook
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(EMSConstants.GoogleKey)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(EMSConstants.FacebookKey)
  }
]);

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
    BreadcrumbComponent,
    DocumentComponent,
    UploadTypeOneComponent,
    UploadTypeTwoComponent,
    EmpListComponent,
    ButtonRenderedComponent,
    AuthorizationComponent,
    AgGridComponent,
    AngularDatatableComponent,
    ImageRenderedComponent,
    LoginComponent,
    EmpDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FileUploadModule,
    AgGridModule.withComponents([ButtonRenderedComponent, ImageRenderedComponent]),
    DataTablesModule,
    NgbModule,
    SocialLoginModule.initialize(config)
  ],
  // Uncomment below line if you would like to use HttpInterceptor
  //providers: [Title, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
