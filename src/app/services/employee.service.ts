import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly apiUri = environment.apiUrl + '/api/employees/';

  constructor(private http: HttpClient) { }

  createEmployee(employee: any) {
    return this.http.post(this.apiUri, employee).pipe(
      map(data => data)
    );
  }

  getEmployee(id: any) {
    return this.http.get(this.apiUri + id).pipe(
      map(data => data)
    );
  }

  getEmployees() {
    return this.http.get(this.apiUri).pipe(
      map(data => data)
    );
  }

  updateEmployee(employee: any) {
    return this.http.put(this.apiUri + employee.id, employee).pipe(
      map(data => data)
    );
  }

}
