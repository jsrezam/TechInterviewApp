import { EnterprisesService } from './../../services/enterprises.service';
import { Component, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp, fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-enterprise-list',
  templateUrl: './enterprise-list.component.html',
  styleUrls: ['./enterprise-list.component.css']
})
export class EnterpriseListComponent implements OnInit {
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  columns = ["Name", "Address", "Phone", "Created Date", "Created By", "Modified Date", "Modified By", "Status"];
  enterprises: any;

  constructor(private enterprisesService: EnterprisesService) { }

  ngOnInit(): void {
    this.getEnterprises();
  }

  getEnterprises() {
    this.enterprisesService.getEnterprises()
      .subscribe((res: any) => {
        this.enterprises = res.data;
      })
  }
}
