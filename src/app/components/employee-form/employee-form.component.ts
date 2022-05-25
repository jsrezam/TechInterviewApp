import { DepartmentService } from './../../services/department.service';
import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnterprisesService } from 'src/app/services/enterprises.service';
import * as moment from 'moment';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employee: any = {
    departments: []
  };
  enterprises: any[] = [];
  departments: any[] = [];

  constructor(private route: ActivatedRoute
    , private router: Router
    , private enterprisesService: EnterprisesService
    , private departmentService: DepartmentService
    , private employeeService: EmployeeService
    , private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getEditId();
    this.getEnterprises();
  }

  getEditId() {
    this.route.params.subscribe(p => {
      this.employee.id = +p['id'] || 0;
      if (this.employee.id !== 0)
        this.getEditableEmployee();
      this.getEnterpriseByEmployee();
    });
  }

  getEditableEmployee() {
    this.employeeService.getEmployee(this.employee.id)
      .subscribe((enterprise: any) => {
        this.employee = enterprise.data;
      })
  }

  getEnterprises() {
    this.enterprisesService.getEnterprises()
      .subscribe((res: any) => {
        this.enterprises = res.data;
      })
  }

  getEnterpriseByEmployee() {
    if (this.employee.id) {
      this.enterprisesService.getEnterpriseByEmployee(this.employee.id)
        .subscribe((enterprise: any) => {
          if (enterprise) {
            this.employee.enterpriseId = enterprise.data.id;
            this.getDepartmentsByEnterprice();
          }
        })
    }
  }

  getDepartmentsByEnterprice() {
    if (this.employee.enterpriseId) {
      this.departmentService.getDepartmentsByEnterprise(this.employee.enterpriseId)
        .subscribe((departments: any) => {
          this.departments = departments.data;
        })
    }
  }

  onEnterpriceChange() {
    this.employee.departments.splice(0, this.employee.departments.length);
    this.getDepartmentsByEnterprice();
  }

  onDepartmentToggle(departmentId: any, $event: any) {
    if ($event.target.checked) {
      this.employee.departments.push(departmentId);
    } else {
      var index = this.employee.departments.indexOf(departmentId);
      this.employee.departments.splice(index, 1);
    }
  }

  createEmployee(form: any) {
    if (form.valid) {
      if (this.checkBirthdate()) {
        let result$ = (this.employee.id) ? this.employeeService.updateEmployee(this.employee)
          : this.employeeService.createEmployee(this.employee);

        result$.subscribe(() => {
          this.toastrService.success("Data was successfully saved !!", "Success");
          this.router.navigate(['/employees']);
        }, () => {
          this.toastrService.error("Unexpected error occurred !", "Error");
        })
      }
    }
  }

  checkBirthdate() {
    var date = moment(this.employee.birthdate, "YYYY-MM-DD");
    if (!date.isValid()) {
      this.toastrService.info("Check accepted format", "Birthdate field")
      return false;
    }
    return true;
  }
}
