import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  REQUEST_HANDLER = '/api/request.php';

  constructor(
    private http: HttpClient
  ) { }

  infoByGraffiti(graffiti: string): any {
    const encodedGraffiti = encodeURIComponent(graffiti);
    return this.http.get(
      this.REQUEST_HANDLER, {
        params: {
          request_url: `https://api.ironfish.network/users/find?graffiti=${encodedGraffiti}`
        }
      })
      .toPromise();
  }

  infoPhase1(id: string): any {
    return this.http.get(
      this.REQUEST_HANDLER, {
        params: {
          request_url: `https://phase1.api.ironfish.network/users/${id}/metrics?granularity=lifetime`
        }
      }).toPromise();
  }

  infoPhase2(id: string): any {
    return this.http.get(
      this.REQUEST_HANDLER, {
        params: {
          request_url: `https://phase2.api.ironfish.network/users/${id}/metrics?granularity=lifetime`
        }
      }).toPromise();
  }

  infoPhase3(id: string): any {
    return this.http.get(
      this.REQUEST_HANDLER, {
        params: {
          request_url: `https://api.ironfish.network/users/${id}/metrics?granularity=lifetime`
        }
      }).toPromise();
  }
}
