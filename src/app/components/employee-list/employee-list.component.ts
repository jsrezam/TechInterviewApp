import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  columns = ["Employee", "Position", "Email", "Age", "Created Date", "Created By", "Modified Date", "Modified By", "Status"];
  employees: any;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees() {
    this.employeeService.getEmployees()
      .subscribe((res: any) => {
        this.employees = res.data;
      })
  }

}
