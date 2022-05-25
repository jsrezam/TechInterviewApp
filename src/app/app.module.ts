import { DepartmentListComponent } from './components/department-list/department-list.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { EnterpriseFormComponent } from './components/enterprise-form/enterprise-form.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faArrowUp, faCodeBranch, fas } from '@fortawesome/free-solid-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import { EnterpriseListComponent } from './components/enterprise-list/enterprise-list.component';
import { DepartmentFormComponent } from './components/department-form/department-form.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    EnterpriseFormComponent,
    EnterpriseListComponent,
    DepartmentListComponent,
    DepartmentFormComponent,
    EmployeeListComponent,
    EmployeeFormComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    RouterModule.forRoot([
      { path: '', component: EnterpriseListComponent, pathMatch: 'full' },
      { path: 'enterprises', component: EnterpriseListComponent },
      { path: 'enterprises/new', component: EnterpriseFormComponent },
      { path: 'enterprises/edit/:id', component: EnterpriseFormComponent },
      { path: 'departments', component: DepartmentListComponent },
      { path: 'departments/new', component: DepartmentFormComponent },
      { path: 'departments/edit/:id', component: DepartmentFormComponent },
      { path: 'employees', component: EmployeeListComponent },
      { path: 'employees/new', component: EmployeeFormComponent },
      { path: 'employees/edit/:id', component: EmployeeFormComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas)
    library.addIcons(faArrowDown);
    library.addIcons(faArrowUp);
    library.addIcons(faCodeBranch)
  }
}
