import { EnterprisesService } from './../../services/enterprises.service';
import { DepartmentService } from './../../services/department.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  department: any = {};
  enterprises: any[] = [];

  constructor(private route: ActivatedRoute
    , private router: Router
    , private departmentService: DepartmentService
    , private enterprisesService: EnterprisesService
    , private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getEditId();
    this.getEnterprises();
  }

  getEditId() {
    this.route.params.subscribe(p => {
      this.department.id = +p['id'] || 0;
      if (this.department.id !== 0)
        this.getEditableDepartment();
    });
  }

  getEditableDepartment() {
    this.departmentService.getDepartment(this.department.id)
      .subscribe((enterprise: any) => {
        this.department = enterprise.data;
      })
  }

  getEnterprises() {
    this.enterprisesService.getEnterprises()
      .subscribe((res: any) => {
        this.enterprises = res.data;
      })
  }

  createDepartment(form: any) {
    if (form.valid) {
      let result$ = (this.department.id) ? this.departmentService.updateDepartment(this.department)
        : this.departmentService.createDepartment(this.department);

      result$.subscribe(() => {
        this.toastrService.success("Data was successfully saved !!", "Success");
        this.router.navigate(['/departments']);
      }, () => {
        this.toastrService.error("Unexpected error occurred !", "Error");
      })
    }
  }

}
