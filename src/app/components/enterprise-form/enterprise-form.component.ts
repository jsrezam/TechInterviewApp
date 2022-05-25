import { EnterprisesService } from './../../services/enterprises.service';
import { Component, OnInit } from '@angular/core';
import { Enterprise } from 'src/app/Models/enterprise';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-enterprise-form',
  templateUrl: './enterprise-form.component.html',
  styleUrls: ['./enterprise-form.component.css']
})
export class EnterpriseFormComponent implements OnInit {
  enterprise: Enterprise = {};

  constructor(private route: ActivatedRoute
    , private router: Router
    , private enterprisesService: EnterprisesService
    , private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getEditId();
  }

  getEditId() {
    this.route.params.subscribe(p => {
      this.enterprise.id = +p['id'] || 0;
      if (this.enterprise.id !== 0)
        this.getEditableEnterprise();
    });
  }

  getEditableEnterprise() {
    this.enterprisesService.getEnterprise(this.enterprise.id)
      .subscribe((enterprise: any) => {
        this.enterprise = enterprise.data;
      })
  }

  createEnterprise(form: any) {
    if (form.valid) {
      let result$ = (this.enterprise.id) ? this.enterprisesService.updateEnterprise(this.enterprise)
        : this.enterprisesService.createEnterprise(this.enterprise);

      result$.subscribe(() => {
        this.toastrService.success("Data was successfully saved !!", "Success");
        this.router.navigate(['/']);
      }, () => {
        this.toastrService.error("Unexpected error occurred !", "Error");
      })
    }
  }
}
