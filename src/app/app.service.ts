import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  API1 = 'https://phase1.api.ironfish.network';
  API2 = 'https://api.ironfish.network';
  API = 'https://api.allorigins.win/'
  constructor(
    private http: HttpClient
  ) { }

  infoByGraffiti(graffiti: string): any {
    const encodedGraffiti = encodeURIComponent(graffiti);
    const encoded = encodeURIComponent(`https://api.ironfish.network/users/find?graffiti=${encodedGraffiti}`);

    return this.http.get(
      `https://api.allorigins.win/raw?url=${encoded}`)
      .toPromise();
  }

  infoPhase1(id: string): any {
    const salt = (new Date()).getTime();
    return this.http.get(
      'https://api.allorigins.win/raw?url=https://phase1.api.ironfish.network/users/'+ id + '/metrics?granularity=lifetime'+ `&${salt}`).toPromise();
  }

  infoPhase2(id: string): any {
    const salt = (new Date()).getTime();
    return this.http.get(
      'https://api.allorigins.win/raw?url=https://api.ironfish.network/users/'+ id + '/metrics?granularity=lifetime'+ `&${salt}`).toPromise();
  }
}
