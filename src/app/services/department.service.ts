import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private readonly apiUri = environment.apiUrl + '/api/departments/';

  constructor(private http: HttpClient) { }

  createDepartment(department: any) {
    return this.http.post(this.apiUri, department).pipe(
      map(data => data)
    );
  }

  getDepartment(id: any) {
    return this.http.get(this.apiUri + id).pipe(
      map(data => data)
    );
  }

  getDepartments() {
    return this.http.get(this.apiUri).pipe(
      map(data => data)
    );
  }

  getDepartmentsByEnterprise(enterpriseId: any) {
    return this.http.get(this.apiUri + 'byEnterprice/' + enterpriseId).pipe(
      map(data => data)
    );
  }

  updateDepartment(department: any) {
    return this.http.put(this.apiUri + department.id, department).pipe(
      map(data => data)
    );
  }
}
