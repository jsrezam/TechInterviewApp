import { DepartmentService } from './../../services/department.service';
import { Component, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  columns = ["Enterprise", "Name", "Description", "Phone", "Created Date", "Created By", "Modified Date", "Modified By", "Status"];
  departments: any;

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  public getDepartments() {
    this.departmentService.getDepartments()
      .subscribe((res: any) => {
        this.departments = res.data;
      })
  }

}
