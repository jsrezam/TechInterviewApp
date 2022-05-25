import { Enterprise } from './../Models/enterprise';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class EnterprisesService {
  private readonly apiUri = environment.apiUrl + '/api/enterprises/';

  constructor(private http: HttpClient) { }

  createEnterprise(enterprise: Enterprise) {
    return this.http.post(this.apiUri, enterprise).pipe(
      map(data => data)
    );
  }

  getEnterprise(id: any) {
    return this.http.get(this.apiUri + id).pipe(
      map(data => data)
    );
  }

  getEnterpriseByEmployee(employeeId: any) {
    return this.http.get(this.apiUri + "byEmployee/" + employeeId).pipe(
      map(data => data)
    );
  }

  getEnterprises() {
    return this.http.get(this.apiUri).pipe(
      map(data => data)
    );
  }

  updateEnterprise(enterprise: Enterprise) {
    return this.http.put(this.apiUri + enterprise.id, enterprise).pipe(
      map(data => data)
    );
  }
}
